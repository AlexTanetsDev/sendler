import { NextResponse } from "next/server";

import { QueryResult } from "pg";
import {
	IGroupId,
	IClientId
} from "@/globaltypes/types";
import {
	deleteClientMemberInGroupData,
	fetchAllGroupsId
} from "@/api-actions";

export default async function editGroup(clients: IClientId[], groupId: number, method: string): Promise<null | NextResponse<{
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

		for (const client of clients) {
			await deleteClientMemberInGroupData(client, groupId);
		}

	} catch (error: any) {
		throw new Error(error.message);
	}
}