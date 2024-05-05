import db from "@/db";

import { QueryResult } from "pg";
import { IGroupDatabase } from "@/globaltypes/types";

export default async function insertNewGroup(name: string, id: number, automaticallyGenerated?: boolean): Promise<QueryResult<IGroupDatabase>> {

	if (automaticallyGenerated) {
		const res: QueryResult<IGroupDatabase> = await db.query(
			`INSERT INTO send_groups (group_name, user_id, automatically_generated)	values($1, $2, $3) RETURNING *`,
			[name, id, automaticallyGenerated]);

		return res;
	} else {
		const res: QueryResult<IGroupDatabase> = await db.query(
			`INSERT INTO send_groups (group_name, user_id) values($1, $2) RETURNING *`,
			[name, id]);

		return res;
	};
};
