import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

import getUserGroupes from '@/app/api/controllers/sending-groups/getUserGroups';

import HttpError from '@/helpers/HttpError';
import insertNewClient from "@/services/insertNewClient/insertNewClient";
import insertGroupMember from "@/services/insertGroupMember/insertGroupMember";


import { IQieryParamsCreateGroup } from "./types";
import {
	IUserId,
	IGroup,
	QueryResult,
	IGroupName,
	ITel,
	ITelRes
} from "@/globaltypes/types";


// get all groups for one user by user ID
export async function GET(request: NextRequest): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: string; }> | NextResponse<Promise<IGroupName[] | null>>> {

	const { searchParams }: URL = new URL(request.url);
	const userId = Number(searchParams.get("userId"));

	//checking user_id existense
	if (userId) {
		try {
			const res: null | IGroupName = await getUserGroupes(userId);

			if (res === null) {
				return HttpError(400, `The user with id = ${userId} does not exist`);
			}
			return NextResponse.json(
				{ groups: res, message: 'Get a groups' },
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
export async function POST(request: Request): Promise<NextResponse<{
	message: string;
}> | NextResponse<{ error: any; }> | NextResponse<string>> {
	const { groupName, clients }: IQieryParamsCreateGroup = await request.json();
	const { searchParams }: URL = new URL(request.url);
	const userId = Number(searchParams.get("userId"));
	const method = request.method;

	//checking the content of the entered group
	try {
		if (clients.length === 0) {
			return HttpError(400, `The clients list is empty`);
		}

		//checking user_id existense
		const usersIdRes: QueryResult<IUserId> = await db.query(`SELECT user_id FROM users`);
		const usersIdInDatabase: IUserId[] = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return HttpError(400, `The user with id = ${userId} does not exist`);
		}

		//checking same group_name existense for user
		const groupsNameRes: QueryResult<IGroupName> = await db.query(
			`SELECT group_name FROM send_groups WHERE user_id=${userId}`
		);
		const groupsNameInDatabase = groupsNameRes.rows;

		if (
			groupsNameInDatabase.find(
				(groupNameInDatabase: IGroupName) => groupNameInDatabase.group_name === groupName
			)
		) {

			return HttpError(400, `The group with name ${groupName} already exists`);
		}


		const group: QueryResult<IGroup> = await db.query(
			`INSERT INTO send_groups (group_name, user_id) values($1, $2) RETURNING *`,
			[groupName, userId]
		);
		const groupId = group.rows[0].group_id;

		const userClientsRes: QueryResult<ITelRes> = await db.query(
			`SELECT tel FROM clients WHERE user_id = ${userId}`
		);

		//checking whether a client exists in the user's client list
		//and adding client
		const userClientsInDtabase = userClientsRes.rows;

		for (const client of clients) {
			const tel = client.tel;

			if (!userClientsInDtabase.find((userClientInDtabase: ITelRes) => userClientInDtabase.tel === String(tel))) {
				await insertNewClient(client, userId, groupId, method);
			}
			await insertGroupMember(tel, userId, groupId);
		}

		return NextResponse.json(
			{ group: group.rows[0], message: "New group created successfully" },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
