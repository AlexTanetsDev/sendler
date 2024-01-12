import db from "@/db";

export default async function deleteGroupMembersData(id: number): Promise<void> {
	try {
		await db.query(
			`DELETE FROM groups_members
    WHERE groups_members.group_id = ${id}`
		);
	} catch (error) {
		console.log('deleteGroupMembersData')
	}

};