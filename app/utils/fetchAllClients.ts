import db from "@/db";

import { QueryResult } from "pg";
import { IClientId, IClient } from "@/globaltypes/types";

export default async function fetchAllClients(): Promise<QueryResult<IClientId | IClient>> {

	const res: QueryResult<IClientId | IClient> = await db.query(
		`SELECT client_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2
		FROM clients`);

	return res;
};