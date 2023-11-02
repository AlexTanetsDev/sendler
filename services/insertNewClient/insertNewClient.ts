import db from "@/db";

export default async function insertNewClient(tel: number, user_id: number) {
	await db.query(
		`INSERT INTO clients (tel, user_id) values($1, $2) RETURNING *`,
		[tel, user_id]
	);
}