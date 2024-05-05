import db from "@/db";

export default async function deleteHistoryId(id: number): Promise<void> {
	await db.query(
		`DELETE FROM sending_history
		WHERE history_id = ${id}`
	);

	await db.query(
		`DELETE FROM sending_members
		WHERE history_id = ${id}`
	);
};