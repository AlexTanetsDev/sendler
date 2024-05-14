import db from "@/db";

import { QueryResult } from "pg";
import { IResAlfaNames } from "@/globaltypes/types";

export default async function fetchUserArrayHistoryIdInProgress(id: number): Promise<QueryResult<IResAlfaNames>> {
	const res: QueryResult<IResAlfaNames> = await db.query(`SELECT DISTINCT rs.history_id
FROM recipients_status rs
INNER JOIN sending_history sh ON sh.history_id = rs.history_id
WHERE rs.recipient_status = 'pending' AND sg.user_id = ${id}`
	);
	return res;
};
