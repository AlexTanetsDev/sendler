import { NextResponse } from "next/server";
import db from "@/db";

import {
	getTelClient,
	insertNewGroup,
	insertGroupMember,
	insertNewClient
} from "@/app/utils";

import {
	IGroupId,
	QueryResult,
	IUserId,
	ITelRes,
	IClientDatabase,
	ErrorCase
} from "@/globaltypes/types";
// import { IQieryParamsUpdateGroup } from "./types";

export default async function updateGroup(clients: IClientDatabase[], groupId: number, method: string): Promise<ErrorCase | NextResponse<{
	error: string;
}> | undefined> {

	try {
		//checking the content of the entered group
		if (clients.length === 0) {
			return 1;
		}

		//checking group existense
		const groupsIdRes: QueryResult<IGroupId> = await db.query(`SELECT group_id FROM send_groups`);
		const groupsIdInDatabase: IGroupId[] = groupsIdRes.rows;

		if (
			!groupsIdInDatabase.find(
				(groupIdInDatabase: IGroupId) => groupIdInDatabase.group_id === groupId
			)
		) {
			return 2;
		}

		await db.query(
			`DELETE FROM groups_members
    WHERE groups_members.group_id = ${groupId}`
		);

		const userIdRes: QueryResult<IUserId> = await db.query(
			`SELECT user_id FROM send_groups WHERE send_groups.group_id = ${groupId}`
		);

		const userId = userIdRes.rows[0].user_id;

		const userClientsRes: QueryResult<ITelRes> = await db.query(
			`SELECT tel FROM clients WHERE user_id = ${userId}`
		);

		//checking whether a client exists in the user's client list
		//and adding client
		const userClients = userClientsRes.rows;

		for (const client of clients) {
			const tel = Number(client.tel);

			if (!userClients.find((userClient: ITelRes) => userClient.tel === String(tel))) {
				await insertNewClient(client, userId, groupId, method);
			}
			await insertGroupMember(tel, userId, groupId);
		}
	} catch (error: any) {
		throw new Error(error.message);
	}
}