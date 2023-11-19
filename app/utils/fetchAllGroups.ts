import db from "@/db";

import { QueryResult } from "pg";
import { IGroupDatabase } from "@/globaltypes/types";

export default async function fetchAllGroups(): Promise<QueryResult<IGroupDatabase>> {

	const res: QueryResult<IGroupDatabase> = await db.query(
		`SELECT group_id, group_name, user_id 
		FROM send_groups`
	);

	return res;
};