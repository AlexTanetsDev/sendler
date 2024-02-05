import { NextResponse } from "next/server";

import { QueryResult } from "pg";
import {
	IGroupId,
	IUserId,
	IClient,
	IClientDatabase,
} from "@/globaltypes/types";
import {
	fetchAllGroupsId,
	deleteGroupMembersData,
	fetchUserIdGroup,
	fetchUserClients,
	updateClientData,
	insertGroupMember,
	insertNewClientInGroup,
} from "@/api-actions";

export default async function updateGroup(clients: IClient[], groupId: number, method: string): Promise<null | NextResponse<{
	error: string;
}> | undefined> {

	try {
		//checking group existense
		const groupsIdRes: QueryResult<IGroupId> = await fetchAllGroupsId();
		const groupsIdInDatabase: IGroupId[] = groupsIdRes.rows;

		if (
			!groupsIdInDatabase.find(
				(groupIdInDatabase: IGroupId) => groupIdInDatabase.group_id === groupId
			)
		) {
			return null;
		}

		const deleteFunction = deleteGroupMembersData(groupId);

		const userIdResData = fetchUserIdGroup(groupId);

		const [userIdRes]: [QueryResult<IUserId>, void] = await Promise.all([userIdResData, deleteFunction]);

		const userId = userIdRes.rows[0].user_id;

		const userClientsRes: QueryResult<IClientDatabase> = await fetchUserClients(userId, '', null, 0);

		//checking whether a client exists in the user's client list
		//and adding client
		const userClients = userClientsRes.rows;

		for (const client of clients) {
			const { tel } = client;

			const userClient = userClients.find(userClient => userClient.tel === tel);

			if (userClient) {
				const res = await updateClientData(client, userClient.client_id,);
				if (res) {
					await insertGroupMember(tel, userId, groupId);
				}
			} else {
				const res = await insertNewClientInGroup(client, userId, groupId, method);
				if (res) {
					await insertGroupMember(tel, userId, groupId);
				}
			};

		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}