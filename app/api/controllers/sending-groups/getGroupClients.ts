import { NextResponse } from "next/server";

import {
	fetchAllGroupId,
	fetchGroupClients,
	fetchOneUserGroupName
} from "@/app/utils";

import { QueryResult } from "pg";
import {
	IGroupId,
	IClientDatabase,
	IGroupName,
} from "@/globaltypes/types";

export default async function getGroupClients(groupId: number): Promise<{ group: string, clients: IClientDatabase[] } | NextResponse<{ message: string; }> | null> {
	try {
		const groupsRes: QueryResult<IGroupId> = await fetchAllGroupId();
		const groupsId: IGroupId[] = groupsRes.rows;
		const groupNameRes: QueryResult<IGroupName> = await fetchOneUserGroupName(groupId);
		const groupName: string = groupNameRes.rows[0].group_name;

		if (
			!groupsId.find(
				(group: IGroupId) => group.group_id === groupId
			)
		) {
			return null
		}

		const groupClients: QueryResult<IClientDatabase> = await fetchGroupClients(groupId);

		return { group: groupName, clients: groupClients.rows };
	} catch (error: any) {
		throw new Error(error.message);
	}
}