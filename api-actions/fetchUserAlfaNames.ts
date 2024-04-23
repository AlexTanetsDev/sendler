import db from "@/db";

import { QueryResult } from "pg";
import { IResAlfaNames } from "@/globaltypes/types";

export default async function fetchUserAlfaNames(id: number): Promise<QueryResult<IResAlfaNames>> {
	const res: QueryResult<IResAlfaNames> = await db.query(`SELECT alfa_name, alfa_name_active
	FROM sendler_name
	WHERE user_id = ${id}`
	);
	return res;
};