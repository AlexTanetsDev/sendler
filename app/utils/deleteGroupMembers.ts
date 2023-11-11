import db from "@/db";

export default async function deleteGroupMembers(id: number): Promise<void> {
	await db.query(
		`DELETE FROM groups_members
    WHERE groups_members.group_id = ${id}`
	);
};