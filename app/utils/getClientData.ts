import db from "@/db";

import { IClientDatabase, QueryResult } from "@/globaltypes/types";

export default async function getClientData(id: number) {

	const res: QueryResult<IClientDatabase> = await db.query(`SELECT tel, client_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2 FROM clients WHERE  client_id=${id}`);
	return res;
};