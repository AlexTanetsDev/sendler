import db from "@/db";

import { IGroup, QueryResult } from "@/globaltypes/types";

export default async function insertNewGroup(name: string, id: number): Promise<QueryResult<IGroup>> {
	const res: QueryResult<IGroup> = await db.query(
		`INSERT INTO send_groups (group_name, user_id) values($1, $2) RETURNING *`,
		[name, id])
	return res;
};
