import { NextResponse } from "next/server";
import db from "@/db";

import HttpError from "@/helpers/HttpError";
import insertNewClient from "@/services/insertNewClient/insertNewClient";
import insertGroupMember from "@/services/insertGroupMember/insertGroupMember";

import { IGroupIdInDatabase } from "@/globaltypes/types";
import { IUserClientTelObject } from "@/globaltypes/types";
import { IGroupId } from "@/globaltypes/types";
import { IQieryParamsUpdateGroup } from "./types";

// get one group with id from params
export async function GET(request: Request, { params }: { params: { id: string } }) {
	const groupId = Number(params.id);

	//checking group_id existense
	const groupsRes = await db.query("SELECT group_id FROM send_groups");
	const groupsId: IGroupId[] = groupsRes.rows;

	if (
		!groupsId.find(
			(group: IGroupId) => group.group_id === groupId
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

// delete one group with id from params
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const groupId = Number(params.id);

	//checking group_id existense
	const groupsIdRes = await db.query("SELECT group_id FROM send_groups");
	const groupsIdInDatabase: IGroupIdInDatabase[] = groupsIdRes.rows;

	if (
		!groupsIdInDatabase.find(
			(groupIdInDatabase: IGroupIdInDatabase) => groupIdInDatabase.group_id === groupId
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

//update one group with id from params
export async function PUT(request: Request, { params }: { params: { id: string } }) {
	const { clients }: IQieryParamsUpdateGroup = await request.json();
	const groupId = Number(params.id);

	//checking the content of the entered group
	if (clients.length === 0) {
		return HttpError(400, `The clients list is empty`);
	}

	//checking group existense
	const groupsIdRes = await db.query(`SELECT group_id FROM send_groups`);
	const groupsIdInDatabase: IGroupIdInDatabase[] = groupsIdRes.rows;

	if (
		!groupsIdInDatabase.find(
			(groupIdInDatabase: IGroupIdInDatabase) => groupIdInDatabase.group_id === groupId
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
		const userClients: IUserClientTelObject[] = userClientsRes.rows;

		for (const client of clients) {
			const tel = Number(client.tel);

			if (!userClients.find((userClient: IUserClientTelObject) => userClient.tel === String(tel))) {
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
