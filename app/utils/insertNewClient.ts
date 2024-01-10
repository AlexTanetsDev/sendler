import db from "@/db";

import { IClient, IClientId, IGroupId } from "@/globaltypes/types";

import { QueryResult } from "pg";

export default async function insertNewClient(client: IClient, user_id: number, groupId: IGroupId): Promise<void> {
	const { tel, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2, } = client;

	const res: QueryResult<IClient> = await db.query(
		`INSERT INTO clients (tel, user_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2 )
			 values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
		[tel, user_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2]
	);

	const resClientId: QueryResult<IClientId> = await db.query(
		`SELECT client_id
		FROM clients 
		WHERE tel = ${tel}`
	);

	if (res && resClientId) {
		const client_id = resClientId.rows[0].client_id;
		await db.query(`INSERT INTO groups_members (group_id, client_id)
			 values($1, $2) RETURNING *`,
			[groupId, client_id]);
	}

}