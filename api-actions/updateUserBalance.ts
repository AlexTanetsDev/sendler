import db from "@/db";

import { QueryResult } from "pg";
import { fetchUserBalance } from ".";
import { IResUserBalance } from "@/globaltypes/types";

export default async function updateUserBalance(id: number | undefined) {
	try {
		if (id === null || id === undefined) { return null; }
		else {

			const res: QueryResult<IResUserBalance> = await fetchUserBalance(id);
			const balance = res.rows[0].result;
			await db.query(
				`UPDATE users
				SET balance = ${balance}
				WHERE user_id = ${id} RETURNING *`);
			return balance;
		};
	} catch (error: any) {
		throw new Error(error.message);
	};
};