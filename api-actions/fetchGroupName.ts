import db from "@/db";

import { QueryResult } from "pg";
import { IGroupName } from "@/globaltypes/types";

export default async function fetchGroupName(id: number): Promise<QueryResult<IGroupName>> {

	const res: QueryResult<IGroupName> = await db.query(
		`SELECT group_name 
		FROM send_groups
		WHERE group_id=${id}`
	);

	return res;
};