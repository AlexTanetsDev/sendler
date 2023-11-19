import db from "@/db";

import { QueryResult } from "pg";
import { IClient } from "@/globaltypes/types";

export default async function fetchGroupClients(id: number): Promise<QueryResult<IClient>> {
	const res: QueryResult<IClient> = await db.query(
		`SELECT groups_members.client_id
		FROM groups_members
		JOIN clients ON groups_members.client_id = clients.client_id
		WHERE groups_members.group_id = ${id} `
	);
	return res;
};