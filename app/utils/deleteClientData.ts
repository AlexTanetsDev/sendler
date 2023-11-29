import db from "@/db";

export default async function deleteGroupData(id: number): Promise<void> {
	await db.query(
		`DELETE FROM clients
		WHERE clients.client_id = ${id}`
	);
};