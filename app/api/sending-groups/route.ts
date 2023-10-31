import { NextResponse } from "next/server";
import db from "@/db";

import HttpError from '@/helpers/HttpError';
import insertNewClient from "@/helpers/insertNewClient";
import insertGroupMember from "@/helpers/insertGroupMember";

// get all groups for one user by user ID
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const userId = Number(searchParams.get("userId"));

	if (userId) {
		// getting logic for one user
		//checking user_id existense
		const usersRes = await db.query(`SELECT user_id FROM users`);
		const users = usersRes.rows;

		if (!users.find((user) => user.user_id === userId)) {
			return HttpError(400, `The user with id = ${userId} does not exist`);
		}

		try {
			const groups = await db.query(
				`SELECT group_name FROM send_groups WHERE user_id = ${userId}`
			);
			return NextResponse.json(
				{ groups: groups.rows },
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ message: "Failed to get a list of group" },
				{ status: 500, }
			);
		}
	}

	return HttpError(400, `No userId`);
}

// add new sendig group, here we working with excel file of clients and get user ID from search params
// 1. we adding all clients to clients table and getting all clients id in array
// 2. create sending group with user_id from search params and array of clients
export async function POST(request: Request) {
	const { groupName, clients } = await request.json();
	const { searchParams } = new URL(request.url);
	const userId = Number(searchParams.get("userId"));

	//checking the content of the entered group
	if (clients.length === 0) {
		return HttpError(400, `The clients list is empty`);
	}

	//checking user_id existense
	const usersRes = await db.query(`SELECT user_id FROM users`);
	const users = usersRes.rows;

	if (!users.find((user) => user.user_id === userId)) {
		return HttpError(400, `The user with id = ${userId} does not exist`);
	}

	//checking same group_name existense for user
	const groupsNameRes = await db.query(
		`SELECT group_name FROM send_groups WHERE user_id=${userId}`
	);
	const groupsNameInDatabase = groupsNameRes.rows;

	if (
		groupsNameInDatabase.find(
			(groupNameInDatabase) => groupNameInDatabase.group_name === groupName
		)
	) {

		return HttpError(400, `The group with name ${groupName} already exists`);
	}

	try {
		const group = await db.query(
			`INSERT INTO send_groups (group_name, user_id) values($1, $2) RETURNING *`,
			[groupName, userId]
		);
		const userClientsRes = await db.query(
			`SELECT tel FROM clients WHERE user_id = ${userId}`
		);

		//checking whether a client exists in the user's client list
		//and adding client
		const userClients = userClientsRes.rows;
		const groupId = group.rows[0].group_id;

		for (const client of clients) {
			const tel = client.tel;

			if (!userClients.find((userClient) => userClient.tel === String(tel))) {
				await insertNewClient(tel, userId);
			}
			await insertGroupMember(tel, userId, groupId);
		}

		return NextResponse.json(
			{ group: group.rows[0], message: "New group created successfully" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json("Failed to create a new group", { status: 500 });
	}
}
