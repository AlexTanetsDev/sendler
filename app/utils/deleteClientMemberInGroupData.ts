import db from "@/db";
import { IClientId } from "@/globaltypes/types";

export default async function deleteGroupMembersData(clientId: IClientId, groupId: number): Promise<void> {

	await db.query(
		`DELETE FROM groups_members
    WHERE group_id = ${groupId} AND client_id = ${clientId}`
	);
};