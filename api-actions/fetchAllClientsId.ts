import db from "@/db";

import { QueryResult } from "pg";
import { IClientId } from "@/globaltypes/types";

export default async function fetchAllClientsId(): Promise<QueryResult<IClientId>> {
	const res: QueryResult<IClientId> = await db.query(
		`SELECT client_id 
		FROM clients`);
	return res;
};