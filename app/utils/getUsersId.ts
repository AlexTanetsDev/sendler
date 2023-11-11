import db from "@/db";

import {
	IUserId,
	QueryResult,
} from "@/globaltypes/types";

export default async function getUsersId(): Promise<QueryResult<IUserId>> {
	const res = await db.query(`SELECT user_id FROM users`);
	return res;
};