import db from "@/db";

import { QueryResult } from "pg";
import { IGroupDatabase } from "@/globaltypes/types";

export default async function fetchUserGroups(id: number): Promise<QueryResult<IGroupDatabase>> {
	const res: QueryResult<IGroupDatabase> = await db.query(
		`SELECT group_id, group_name, user_id 
		FROM send_groups
		WHERE user_id=${id}`
	);
	return res;
};