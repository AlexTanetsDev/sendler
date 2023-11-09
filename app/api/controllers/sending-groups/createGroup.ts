import { NextResponse } from "next/server";
import db from "@/db";

import insertNewClient from "@/services/insertNewClient/insertNewClient";
import insertGroupMember from "@/services/insertGroupMember/insertGroupMember";

import {
	IUserId,
	IGroup,
	QueryResult,
	IGroupName,
	ITelRes,
	IUserСlient,
	ErrorCase
} from "@/globaltypes/types";


export default async function createGroup(groupName: string, clients: IUserСlient[], userId: number, method: string): Promise<IGroup | ErrorCase | NextResponse<{
	error: string;
}>> {
	try {
		if (clients.length === 0) {
			return 1;
		}

		//checking user_id existense
		const usersIdRes: QueryResult<IUserId> = await db.query(`SELECT user_id FROM users`);
		const usersIdInDatabase: IUserId[] = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return 2;
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
			return 3;
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
		return group.rows[0];
	} catch (error: any) {
		throw new Error(error.message);
	}
}