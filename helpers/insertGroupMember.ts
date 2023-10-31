import db from "@/db";

export default async function insertGroupMember(tel: number, user_id: number, group_id: number) {
	const clientId = await db.query(
		`SELECT client_id FROM clients WHERE user_id = ${user_id} AND tel=${tel} `
	);

	const { client_id } = clientId.rows[0];
	await db.query(
		`INSERT INTO groups_members (group_id, client_id) values($1, $2) RETURNING *`,
		[group_id, client_id]
	);
}