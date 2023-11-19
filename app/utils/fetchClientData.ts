import db from "@/db";

import { QueryResult } from "pg";
import { IClientDatabase } from "@/globaltypes/types";

export default async function fetchClientData(id: number) {

	const res: QueryResult<IClientDatabase> = await db.query(

		`SELECT tel, client_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2
		FROM clients
		WHERE  client_id=${id}`);

	return res;
};