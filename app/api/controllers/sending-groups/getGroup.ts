import { NextResponse } from "next/server";
import db from "@/db";

import {
	IGroupId,
	QueryResult,
	IClient,
} from "@/globaltypes/types";

export default async function getGroup(groupId: number): Promise<IClient[] | NextResponse<{ message: string; }> | null> {
	try {
		const groupsRes: QueryResult<IGroupId> = (await db.query("SELECT group_id FROM send_groups"));
		const groupsId: IGroupId[] = groupsRes.rows;

		console.log('groupId: ', groupId);
		console.log('groupsId: ', groupsId);


		if (
			!groupsId.find(
				(group: IGroupId) => group.group_id === groupId
			)
		) {
			return null
			// throw HttpError(400, `The group with id = ${groupId} does not exist`);
		}
		const groupClients: QueryResult<IClient> = await db.query(
			`SELECT groups_members.client_id
		FROM groups_members
		JOIN clients ON groups_members.client_id = clients.client_id
		WHERE groups_members.group_id = ${groupId} `
		);

		return groupClients.rows
	} catch (error: any) {
		throw new Error(error.message);
	}
}