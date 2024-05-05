import db from "@/db";

import { fetchUserBalance } from ".";
import { QueryResult } from "pg";
import { IResUserBalance } from "@/globaltypes/types";

export default async function correctUserBalance(id: number, quantity: number): Promise<QueryResult<IResUserBalance> | null> {
	const resBalance: QueryResult<IResUserBalance> = await fetchUserBalance(id);
	const balance = resBalance.rows[0].result;
	if (!balance) {
		return null;
	};
	await db.query(
		`UPDATE users
		SET balance = ${balance + quantity} where user_id = ${id}`
	);
	const res = await fetchUserBalance(id);
	return res;
};