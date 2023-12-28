import db from "@/db";

import { QueryResult } from "pg";
import { IClient } from "@/globaltypes/types";

export default async function fetchGroupClients(id: number): Promise<QueryResult<IClient>> {

	const res: QueryResult<IClient> = await db.query(
		`SELECT groups_members.client_id, tel, first_name, middle_name, last_name, to_char(date_of_birth, 'DD.MM.YYYY') AS date_of_birth, parameter_1, parameter_2
		FROM groups_members
		JOIN clients ON groups_members.client_id = clients.client_id
		WHERE groups_members.group_id = ${id} `
	);

	return res;
};