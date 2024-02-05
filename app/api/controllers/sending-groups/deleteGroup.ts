import { NextResponse } from "next/server";

import {

} from "@/app/utils";

import { QueryResult } from "pg";
import { IGroupId } from "@/globaltypes/types";
import {
	fetchAllGroupsId,
	deleteGroupData
} from "@/api-actions";

export default async function deleteGroup(groupId: number): Promise<NextResponse<{
	error: string;
}> | undefined | null> {
	try {
		//checking group_id existense
		const groupsIdRes: QueryResult<IGroupId> = await fetchAllGroupsId();
		const groupsIdInDatabase: IGroupId[] = groupsIdRes.rows;

		if (
			!groupsIdInDatabase.find(
				(groupIdInDatabase: IGroupId) => groupIdInDatabase.group_id === groupId
			)
		) {
			return null;
		}

		await deleteGroupData(groupId);

	} catch (error: any) {
		throw new Error(error.message);
	}
}