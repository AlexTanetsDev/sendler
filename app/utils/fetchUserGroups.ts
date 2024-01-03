import db from "@/db";

import { QueryResult } from "pg";
import { IGroupDatabase } from "@/globaltypes/types";

export default async function fetchUserGroups(id: number): Promise<QueryResult<IGroupDatabase>> {

	const res: QueryResult<IGroupDatabase> = await db.query(
		`SELECT send_groups.group_id, group_name, user_id, to_char(group_create_date, 'DD.MM.YYYY HH24:MI:SS') AS group_create_date, COUNT(groups_members.group_id)  AS number_members
		FROM send_groups
		LEFT JOIN groups_members ON send_groups.group_id = groups_members.group_id
		WHERE user_id = ${id}
		GROUP BY send_groups.group_id
		ORDER BY group_name`
	);

	return res;
};
