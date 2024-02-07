import db from "@/db";

import { QueryResult } from "pg";
import { IClientId } from "@/globaltypes/types";

export default async function insertGroupMember(tel: string, user_id: number, group_id: number): Promise<void> {
	try {

		const clientId: QueryResult<IClientId> = await db.query(
			`SELECT client_id 
			FROM clients
			WHERE user_id = ${user_id} AND tel = '${tel}' `
		);

		if (clientId) {
			const { client_id } = clientId.rows[0];
			await db.query(
				`INSERT INTO groups_members (group_id, client_id) values($1, $2) RETURNING *`,
				[group_id, client_id]
			);
		}

	} catch (error: any) {
		throw new Error(error.message);
	}
}