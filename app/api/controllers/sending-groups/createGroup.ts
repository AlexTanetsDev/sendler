import {
	fetchUserClientsTel,
	insertNewGroup,
	insertGroupMember,
	insertNewClientInGroup,
	fetchUserGroupsName,
	fetchUsersId
} from "@/app/utils";

import { QueryResult } from "pg";
import {
	IUserId,
	IGroupDatabase,
	IGroupName,
	ITelRes,
	IClient,
	ErrorCase
} from "@/globaltypes/types";


export default async function createGroup(groupName: string, clients: IClient[], userId: number, method: string): Promise<IGroupDatabase | ErrorCase> {

	try {
		//checking user_id existense
		const usersIdRes: QueryResult<IUserId> = await fetchUsersId();
		const usersIdInDatabase: IUserId[] = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return 1;
		}

		//checking same group_name existense for user
		const groupsNameRes: QueryResult<IGroupName> = await fetchUserGroupsName(userId);
		const groupsNameInDatabase: IGroupName[] = groupsNameRes.rows;

		if (
			groupsNameInDatabase.find(
				(groupNameInDatabase: IGroupName) => groupNameInDatabase.group_name === groupName
			)
		) {
			return 2;
		}

		const groupData: Promise<QueryResult<IGroupDatabase>> = insertNewGroup(groupName, userId);

		const userClientsResData: Promise<QueryResult<ITelRes>> = fetchUserClientsTel(userId);

		const [group, userClientsRes] = await Promise.all([groupData, userClientsResData]);

		const groupId: number = group.rows[0].group_id;

		//checking whether a client exists in the user's client list
		//and adding client
		const userClientsInDtabase = userClientsRes.rows;

		for (const client of clients) {
			const tel = Number(client.tel);

			if (!userClientsInDtabase.find((userClientInDtabase: ITelRes) => userClientInDtabase.tel === String(tel))) {
				await insertNewClientInGroup(client, userId, groupId, method);
			}
			await insertGroupMember(tel, userId, groupId);
		}
		return group.rows[0];
	} catch (error: any) {
		throw new Error(error.message);
	}
}