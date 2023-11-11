import db from "@/db";

import {
	IGroupName,
	QueryResult,
} from "@/globaltypes/types";

export default async function getGroupName(id: number): Promise<QueryResult<IGroupName>> {
	const res = await db.query(
		`SELECT group_name FROM send_groups WHERE user_id=${id}`
	);
	return res;
};
