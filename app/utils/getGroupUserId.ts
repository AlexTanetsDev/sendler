import db from "@/db";

import { QueryResult } from "pg";
import { IUserId } from "@/globaltypes/types";

export default async function getGroupUserId(id: number): Promise<QueryResult<IUserId>> {
	const res = await db.query(
		`SELECT user_id FROM send_groups WHERE send_groups.group_id = ${id}`
	);
	return res;
};