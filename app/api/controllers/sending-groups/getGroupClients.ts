import { NextResponse } from "next/server";

import {
	fetchAllGroupId,
	fetchGroupClients
} from "@/app/utils";

import { QueryResult } from "pg";
import {
	IGroupId,
	IClient,
} from "@/globaltypes/types";

export default async function getGroupClients(groupId: number): Promise<IClient[] | NextResponse<{ message: string; }> | null> {
	try {
		const groupsRes: QueryResult<IGroupId> = await fetchAllGroupId();
		const groupsId: IGroupId[] = groupsRes.rows;

		if (
			!groupsId.find(
				(group: IGroupId) => group.group_id === groupId
			)
		) {
			return null
		}

		const groupClients: QueryResult<IClient> = await fetchGroupClients(groupId);

		return groupClients.rows
	} catch (error: any) {
		throw new Error(error.message);
	}
}