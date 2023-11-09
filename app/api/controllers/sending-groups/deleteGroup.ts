import { NextResponse } from "next/server";
import db from "@/db";

import HttpError from "@/helpers/HttpError";

import {
	IGroupId,
	QueryResult,
} from "@/globaltypes/types";
// import { IQieryParamsUpdateGroup } from "./types";

export default async function deleteGroupe(groupId: number): Promise<NextResponse<{
	error: string;
}> | undefined | null> {
	try {
		//checking group_id existense
		const groupsIdRes: QueryResult<IGroupId> = (await db.query("SELECT group_id FROM send_groups"));
		const groupsIdInDatabase: IGroupId[] = groupsIdRes.rows;

		if (
			!groupsIdInDatabase.find(
				(groupIdInDatabase: IGroupId) => groupIdInDatabase.group_id === groupId
			)
		) {
			return null;
		}
		await db.query(
			`DELETE FROM send_groups
		WHERE send_groups.group_id = ${groupId}`
		);
	} catch (error: any) {
		throw new Error(error.message);
	}
}