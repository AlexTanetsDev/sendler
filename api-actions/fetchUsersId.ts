import db from "@/db";

import { QueryResult } from "pg";
import { IUserId } from "@/globaltypes/types";

export default async function fetchUsersId(): Promise<QueryResult<IUserId>> {

	const res: QueryResult<IUserId> = await db.query(
		`SELECT user_id 
		FROM users`);

	return res;
};