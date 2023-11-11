import db from "@/db";

import { ITelRes, QueryResult } from "@/globaltypes/types";

export default async function getUserClientsTel(id: number): Promise<QueryResult<ITelRes>> {
	const res: QueryResult<ITelRes> = await db.query(
		`SELECT tel FROM clients WHERE user_id = ${id}`
	);
	return res;
};
