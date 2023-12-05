import db from "@/db";

import { QueryResult } from "pg";
import { ITelRes } from "@/globaltypes/types";

export default async function fetchUserClientsTel(id: number): Promise<QueryResult<ITelRes>> {

	const res: QueryResult<ITelRes> = await db.query(
		`SELECT tel 
		FROM clients
		WHERE user_id = ${id}`
	);

	return res;
};
