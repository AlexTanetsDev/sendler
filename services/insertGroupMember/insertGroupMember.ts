import db from "@/db";

import {
	IClientId,
	QueryResult,
} from "@/globaltypes/types";

export default async function insertGroupMember(tel: number, user_id: number, group_id: number) {
	try {
		const clientId: QueryResult<IClientId> = await db.query(
			`SELECT client_id FROM clients WHERE user_id = ${user_id} AND tel=${tel} `
		);

		const { client_id } = clientId.rows[0];
		await db.query(
			`INSERT INTO groups_members (group_id, client_id) values($1, $2) RETURNING *`,
			[group_id, client_id]
		);
	} catch (error: any) {
		await db.query(`DELETE FROM send_groups	WHERE send_groups.group_id = ${group_id}`);
		throw new Error(error.message);
	}

}