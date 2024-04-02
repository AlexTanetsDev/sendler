import db from "@/db";

import { QueryResult } from "pg";

export default async function fetchUserBalance(id: number): Promise<number | null> {
	const res: QueryResult<any> = await db.query(
		`SELECT balance
		FROM users
		WHERE user_id = ${id}`
	);

	if (!res) {
		return null;
	};

	const balance = Number(res.rows[0].balance);
	return balance;
};