import { NextResponse } from "next/server";

import {
	fetchAllGroupId,
	deleteGroupData
} from "@/app/utils";

import { QueryResult } from "pg";
import { IGroupId } from "@/globaltypes/types";
// import { IQieryParamsUpdateGroup } from "./types";

export default async function deleteGroup(groupId: number): Promise<NextResponse<{
	error: string;
}> | undefined | null> {
	try {
		//checking group_id existense
		const groupsIdRes: QueryResult<IGroupId> = await fetchAllGroupId();
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