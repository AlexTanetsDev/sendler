import db from "@/db";

export default async function deleteGroupData(id: number): Promise<void> {
	await db.query(
		`DELETE FROM send_groups
		WHERE send_groups.group_id = ${id}`
	);
};