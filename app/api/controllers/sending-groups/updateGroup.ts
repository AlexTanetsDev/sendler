import { NextResponse } from "next/server";

import {
	getUserClientsTel,
	insertGroupMember,
	insertNewClient,
	getGroupsId,
	deleteGroupMembers,
	getGroupUserId
} from "@/app/utils";

import {
	IGroupId,
	QueryResult,
	IUserId,
	ITelRes,
	IClientDatabase,
	ErrorCase,
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
		const groupsIdRes: QueryResult<IGroupId> = await getGroupsId();
		const groupsIdInDatabase: IGroupId[] = groupsIdRes.rows;

		if (
			!groupsIdInDatabase.find(
				(groupIdInDatabase: IGroupId) => groupIdInDatabase.group_id === groupId
			)
		) {
			return 2;
		}

		// await deleteGroupMembers(groupId);

		// const userIdRes: QueryResult<IUserId> = await getGroupUserId(groupId);
		const deleteFunction = deleteGroupMembers(groupId);

		const userIdResData: Promise<QueryResult<IUserId>> = getGroupUserId(groupId);

		const [userIdRes] = await Promise.all([userIdResData, deleteFunction]);

		const userId = userIdRes.rows[0].user_id;

		const userClientsRes: QueryResult<ITelRes> = await getUserClientsTel(userId);

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