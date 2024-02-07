import db from "@/db";

import { QueryResult } from "pg";
import { IGroupId } from "@/globaltypes/types";

export default async function fetchAllGroupsId(): Promise<QueryResult<IGroupId>> {

	const res: QueryResult<IGroupId> = await db.query(
		`SELECT group_id 
		FROM send_groups`);

	return res;
};