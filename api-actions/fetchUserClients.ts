import db from "@/db";

import { QueryResult } from "pg";
import { IClientDatabase } from "@/globaltypes/types";

export default async function fetchUserClients(id: number, filter: string, limit: number | null, visible: number): Promise<QueryResult<IClientDatabase>> {

	const res: QueryResult<IClientDatabase> = await db.query(
		`SELECT client_id AS id, count(*) OVER() AS total_count, tel, client_id, first_name, middle_name, last_name, to_char(date_of_birth, 'DD.MM.YYYY') AS date_of_birth, parameter_1, parameter_2
		FROM clients
		WHERE  user_id=${id} AND tel ^@ '${filter}'
		ORDER BY tel
		LIMIT ${limit}
		OFFSET ${visible}
		`);
	return res;
};