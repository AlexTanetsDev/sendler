import db from "@/db";

import { QueryResult } from "pg";

export default async function fetchGroupIdByName(id: number | undefined, name: string) {

	const res: QueryResult<any> = await db.query(
		`SELECT group_id 
		FROM send_groups
		WHERE group_name = '${name}' AND user_id = ${id}`
	);

	return res;
};