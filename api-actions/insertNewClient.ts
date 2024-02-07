import db from "@/db";

import { IClient } from "@/globaltypes/types";

import { QueryResult } from "pg";

export default async function insertNewClient(client: IClient, user_id: number): Promise<IClient> {
	const { tel, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2, } = client;

	const res: QueryResult<IClient> = await db.query(
		`INSERT INTO clients (tel, user_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2 )
			 values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
		[tel, user_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2]
	);

	return res.rows[0];
}