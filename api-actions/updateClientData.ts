import db from "@/db";

import { QueryResult } from "pg";
import { IClient } from "@/globaltypes/types";

export default async function updateClientData(client: IClient, clientId: number) {
	const { tel, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2 } = client;

	const res: QueryResult<IClient> = await db.query(
		`UPDATE clients
		SET first_name = $1, middle_name = $2, last_name = $3, date_of_birth = $4, parameter_1 = $5, parameter_2 = $6, tel = $7
		WHERE client_id = $8 RETURNING *`,
		[first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2, tel, clientId]
	);

	return res;
};