import { NextResponse } from "next/server";
import db from "@/db";

// get one sending group
export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;

	//checking group_id existense
	const groupsIdRes = await db.query("SELECT group_id FROM send_groups");
	const groupsIdInDatabase = groupsIdRes.rows;

	if (
		!groupsIdInDatabase.find(
			(groupIdInDatabase) => groupIdInDatabase.group_id === Number(id)
		)
	) {
		return NextResponse.json(
			{ message: `The group with id = ${id} does not exist` },
			{ status: 400 }
		);
	}

	try {
		const groupClients = await db.query(
			`SELECT groups_members.client_id, clients.tel 
		FROM groups_members
		JOIN clients ON groups_members.client_id = clients.client_id
		WHERE groups_members.group_id = ${id} `
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
	const { id } = params;

	//checking group_id existense
	const groupsIdRes = await db.query("SELECT group_id FROM send_groups");
	const groupsIdInDatabase = groupsIdRes.rows;

	if (
		!groupsIdInDatabase.find(
			(groupIdInDatabase) => groupIdInDatabase.group_id === Number(id)
		)
	) {
		return NextResponse.json(
			{ message: `The group with id = ${id} does not exist` },
			{ status: 400 }
		);
	}

	try {
		await db.query(
			`DELETE FROM send_groups
		WHERE send_groups.group_id = ${id}`
		);

		return NextResponse.json(
			{ message: `Group with id = ${id} is deleted` },
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
	const { id } = (params);

	//checking the content of the entered group
	if (clients.length === 0) {
		return NextResponse.json(
			{ message: `The clients list is empty` },
			{ status: 400 }
		);
	}

	//checking group existense
	const groupsIdRes = await db.query(`SELECT group_id FROM send_groups`);
	const groupsIdInDatabase = groupsIdRes.rows;

	if (
		!groupsIdInDatabase.find(
			(groupIdInDatabase) => groupIdInDatabase.group_id === Number(id)
		)
	) {
		return NextResponse.json(
			{ message: `The group with id = ${id} does not exist` },
			{ status: 400 }
		);
	}

	async function insertClient(tel: number, userId: number) {
		await db.query(
			`INSERT INTO clients (tel, user_id) values($1, $2) RETURNING *`,
			[tel, userId]
		);
	}

	async function insertGroupMember(tel: number, userId: number, groupId: number) {
		const clientId = await db.query(
			`SELECT client_id FROM clients WHERE user_id = ${userId} AND tel=${tel} `
		);

		const { client_id } = clientId.rows[0];
		await db.query(
			`INSERT INTO groups_members (group_id, client_id) values($1, $2) RETURNING *`,
			[groupId, client_id]
		);
	}

	try {
		await db.query(
			`DELETE FROM groups_members
    WHERE groups_members.group_id = ${id}`
		);

		const userIdRes = await db.query(
			`SELECT user_id FROM send_groups WHERE send_groups.group_id = ${id}`
		);

		const { user_id } = userIdRes.rows[0];

		const userClientsRes = await db.query(
			`SELECT tel FROM clients WHERE user_id = ${user_id}`
		);

		//checking whether a client exists in the user's client list
		//and adding client
		const userClients = userClientsRes.rows;

		for (const client of clients) {
			const { tel } = client;
			if (!userClients.find((userClient) => userClient.tel === String(tel))) {
				await insertClient(tel, user_id);
			}
			await insertGroupMember(tel, user_id, Number(id));
		}

		return NextResponse.json(
			{ message: `The group updated` },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(`Failed to update a group with id = ${id}`, {
			status: 500,
		});
	}
}