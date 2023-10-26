import { NextResponse } from "next/server";
import db from "@/db";

// get all groups for all users
// or
// get all groups for one user by user ID
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = Number(searchParams.get("userId"));

	if (id) {
		// getting logic for one user
		//checking user_id existense
		const usersIdRes = await db.query(`SELECT user_id FROM users`);
		const usersId = usersIdRes.rows;

		if (!usersId.find((userId) => userId.user_id === Number(id))) {
			return NextResponse.json(
				{ message: `The user with id = ${id} does not exist` },
				{ status: 400, }
			);
		}

		try {
			const groups = await db.query(
				`SELECT group_name FROM send_groups WHERE user_id = ${id}`
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

	return NextResponse.json(
		{ message: `No userId` },
		{ status: 400, }
	);

	//getting all groups
	// try {
	//   const groups = await db.query(`SELECT group_name FROM send_groups`);
	//   return NextResponse.json(groups.rows);
	// } catch (error) {
	//   return NextResponse.json(error);
	// }
}

// add new sendig group, here we working with excel file of clients and get user ID from search params
// 1. we adding all clients to clients table and getting all clients id in array
// 2. create sending group with user_id from search params and array of clients
export async function POST(request: Request) {
	const { groupName, clients } = await request.json();
	const { searchParams } = new URL(request.url);
	const id = Number(searchParams.get("userId"));

	//checking the content of the entered group
	if (clients.length === 0) {
		return NextResponse.json(
			{ message: `The clients list is empty` },
			{ status: 400, }
		);
	}

	//checking user_id existense
	const usersIdRes = await db.query(`SELECT user_id FROM users`);
	const usersId = usersIdRes.rows;

	if (!usersId.find((userId) => userId.user_id === Number(id))) {
		return NextResponse.json(
			{ message: `The user with id = ${id} does not exist` },
			{ status: 400, }
		);
	}

	//checking same group_name existense for user
	const groupsNameRes = await db.query(
		`SELECT group_name FROM send_groups WHERE user_id=${id}`
	);
	const groupsNameInDatabase = groupsNameRes.rows;

	if (
		groupsNameInDatabase.find(
			(groupNameInDatabase) => groupNameInDatabase.group_name === groupName
		)
	) {
		return NextResponse.json(
			{ message: `The group with name ${groupName} already exists` },
			{ status: 409, }
		);
	}

	async function insertClient(tel: number, userId: number) {
		await db.query(
			`INSERT INTO clients (tel, user_id) values($1, $2) RETURNING *`,
			[tel, userId]
		);
	}

	async function insertGroupMember(tel: number, userId: number, groupId: number) {
		const clientIdRes = await db.query(
			`SELECT client_id FROM clients WHERE user_id = ${userId} AND tel=${tel} `
		);

		const { client_id } = clientIdRes.rows[0];

		await db.query(
			`INSERT INTO groups_members (group_id, client_id) values($1, $2) RETURNING *`,
			[groupId, client_id]
		);
	}

	try {
		const group = await db.query(
			`INSERT INTO send_groups (group_name, user_id) values($1, $2) RETURNING *`,
			[groupName, id]
		);
		const userClientsRes = await db.query(
			`SELECT tel FROM clients WHERE user_id = ${id}`
		);

		//checking whether a client exists in the user's client list
		//and adding client
		const userClients = userClientsRes.rows;
		const { group_id } = group.rows[0];

		for (const client of clients) {
			const { tel } = client;

			if (!userClients.find((userClient) => userClient.tel === String(tel))) {
				await insertClient(tel, id);
			}
			await insertGroupMember(tel, id, group_id);
		}

		return NextResponse.json(
			{ group: group.rows[0], message: "Group created successfully" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json("Failed to create a new group", { status: 500 });
	}
}
