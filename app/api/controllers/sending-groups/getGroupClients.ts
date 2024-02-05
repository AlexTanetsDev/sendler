import { QueryResult } from "pg";
import {
	IGroupId,
	IClientDatabase,
	IGroupName,
} from "@/globaltypes/types";
import {
	fetchAllGroupsId,
	fetchGroupName,
	fetchGroupClients
} from "@/api-actions";

export default async function getGroupClients(groupId: number, limit: number | null, visible: number, filter?: string): Promise<{ groupName: string, clients: IClientDatabase[] } | null> {
	try {
		const groupsIdDatabaseRes: QueryResult<IGroupId> = await fetchAllGroupsId();
		const groupsIdDatabase: IGroupId[] = groupsIdDatabaseRes.rows;
		const groupNameRes: QueryResult<IGroupName> = await fetchGroupName(groupId);
		const groupName: string = groupNameRes.rows[0].group_name;

		if (
			!groupsIdDatabase.find(
				(groupIdDatabase: IGroupId) => groupIdDatabase.group_id === groupId
			)
		) {
			return null
		}

		const groupClients: QueryResult<IClientDatabase> = await fetchGroupClients(groupId, limit, visible, filter);

		return { groupName: groupName, clients: groupClients.rows };
	} catch (error: any) {
		throw new Error(error.message);
	}
}