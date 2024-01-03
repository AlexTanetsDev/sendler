import { NextResponse } from "next/server";

import {
	fetchAllGroupId,
	deleteClientData,
	deleteClientMemberInGroupData,
} from "@/app/utils";

import { QueryResult } from "pg";
import {
	IGroupId,
	IClientId
} from "@/globaltypes/types";

export default async function editGroup(clients: IClientId[], groupId: number, method: string): Promise<null | NextResponse<{
	error: string;
}> | undefined> {

	try {
		//checking group existense
		const groupsIdRes: QueryResult<IGroupId> = await fetchAllGroupId();
		const groupsIdInDatabase: IGroupId[] = groupsIdRes.rows;

		console.log('groupsIdInDatabase=', groupsIdInDatabase);

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