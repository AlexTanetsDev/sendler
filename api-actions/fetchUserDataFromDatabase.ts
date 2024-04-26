import db from "@/db";
import { IUser } from "@/globaltypes/types";

import { QueryResult } from "pg";

export default async function fetchUserDataFromDatabase(id: number): Promise<QueryResult<IUser>> {
	const res: QueryResult<IUser> = await db.query(
		`SELECT balance, email, user_active, user_create_date, user_id, user_login, user_name, user_role, tel
    FROM users
		WHERE user_id = ${id}`
	);
	return res;
};