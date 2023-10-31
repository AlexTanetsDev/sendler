import { NextResponse } from "next/server";
import db from "@/db";

import HttpError from "@/helpers/HttpError";
import insertNewClient from "@/helpers/insertNewClient";
import insertGroupMember from "@/helpers/insertGroupMember";

// get one sending group
export async function GET(request: Request, { params }: { params: { id: string } }) {
	const groupId = Number(params.id);

	//checking group_id existense
	const groupsRes = await db.query("SELECT group_id FROM send_groups");
	const groups = groupsRes.rows;

	if (
		!groups.find(
			(group) => group.group_id === groupId
		)
	) {
		return HttpError(400, `The group with id = ${groupId} does not exist`);
	}

	try {
		const groupClients = await db.query(
			`SELECT groups_members.client_id, clients.tel 
		FROM groups_members
		JOIN clients ON groups_members.client_id = clients.client_id
		WHERE groups_members.group_id = ${groupId} `
		);

		return NextResponse.json(
			{ clients: groupClients.rows },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to get a groups list" },
			{ status: 500 }
		);
	}
}

// delete one sending group
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const groupId = Number(params.id);

	//checking group_id existense
	const groupsRes = await db.query("SELECT group_id FROM send_groups");
	const groups = groupsRes.rows;

	if (
		!groups.find(
			(group) => group.group_id === groupId
		)
	) {
		return HttpError(400, `The group with id = ${groupId} does not exist`);
	}

	try {
		await db.query(
			`DELETE FROM send_groups
		WHERE send_groups.group_id = ${groupId}`
		);

		return NextResponse.json(
			{ message: `Group with id = ${groupId} is deleted` },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to delete a group" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	const { clients } = await request.json();
	const groupId = Number(params.id);

	//checking the content of the entered group
	if (clients.length === 0) {
		return HttpError(400, `The clients list is empty`);
	}

	//checking group existense
	const groupsIdRes = await db.query(`SELECT group_id FROM send_groups`);
	const groupsIdInDatabase = groupsIdRes.rows;

	if (
		!groupsIdInDatabase.find(
			(groupIdInDatabase) => groupIdInDatabase.group_id === groupId
		)
	) {
		return HttpError(400, `The group with id = ${groupId} does not exist`);
	}

	try {
		await db.query(
			`DELETE FROM groups_members
    WHERE groups_members.group_id = ${groupId}`
		);

		const userIdRes = await db.query(
			`SELECT user_id FROM send_groups WHERE send_groups.group_id = ${groupId}`
		);

		const userId = userIdRes.rows[0].user_id;

		const userClientsRes = await db.query(
			`SELECT tel FROM clients WHERE user_id = ${userId}`
		);

		//checking whether a client exists in the user's client list
		//and adding client
		const userClients = userClientsRes.rows;

		for (const client of clients) {
			const { tel } = client;
			if (!userClients.find((userClient) => userClient.tel === String(tel))) {
				await insertNewClient(tel, userId);
			}
			await insertGroupMember(tel, userId, groupId);
		}

		return NextResponse.json(
			{ message: `The group is updated` },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(`Failed to update a group with id = ${groupId}`, {
			status: 500,
		});
	}
}
