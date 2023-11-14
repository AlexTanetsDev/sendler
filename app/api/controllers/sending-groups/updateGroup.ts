import { NextResponse } from "next/server";

import {
	fetchUserClientsTel,
	insertGroupMember,
	insertNewClient,
	fetchAllGroupId,
	deleteGroupMembersData,
	fetchGroupUserId
} from "@/app/utils";

import { QueryResult } from "pg";
import {
	IGroupId,
	IUserId,
	ITelRes,
	IClientDatabase,
} from "@/globaltypes/types";
// import { IQieryParamsUpdateGroup } from "./types";

export default async function updateGroup(clients: IClientDatabase[], groupId: number, method: string): Promise<null | NextResponse<{
	error: string;
}> | undefined> {

	try {

		//checking group existense
		const groupsIdRes: QueryResult<IGroupId> = await fetchAllGroupId();
		const groupsIdInDatabase: IGroupId[] = groupsIdRes.rows;

		if (
			!groupsIdInDatabase.find(
				(groupIdInDatabase: IGroupId) => groupIdInDatabase.group_id === groupId
			)
		) {
			return null;
		}

		// await deleteGroupMembers(groupId);

		// const userIdRes: QueryResult<IUserId> = await getGroupUserId(groupId);
		const deleteFunction = deleteGroupMembersData(groupId);

		const userIdResData: Promise<QueryResult<IUserId>> = fetchGroupUserId(groupId);

		const [userIdRes] = await Promise.all([userIdResData, deleteFunction]);

		const userId = userIdRes.rows[0].user_id;

		const userClientsRes: QueryResult<ITelRes> = await fetchUserClientsTel(userId);

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