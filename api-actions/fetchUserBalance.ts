import db from "@/db";
import { IResUserBalance } from "@/globaltypes/types";
import { QueryResult } from "pg";

export default async function fetchUserBalance(id: number): Promise<QueryResult<IResUserBalance>> {
	const res: QueryResult<IResUserBalance> = await db.query(
		`SELECT * 
		FROM get_user_balance(${id})`
	);
	return res;
};