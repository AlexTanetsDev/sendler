import db from "@/db";

import { QueryResult } from "pg";
import { IGroupName } from "@/globaltypes/types";

export default async function fetchAllGroupName(): Promise<QueryResult<IGroupName[]>> {
	const res = await db.query(
		`SELECT group_name FROM send_groups`
	);
	return res;
};