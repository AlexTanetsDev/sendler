import db from "@/db";

import { QueryResult } from "pg";
import { IResPendingSms } from "@/globaltypes/types";

export default async function fetchUserPendingSmsByHistoryId(id: number, historyId: number): Promise<QueryResult<IResPendingSms>> {
	const res: QueryResult<IResPendingSms> = await db.query(
		`SELECT get_pending_sms_by_user_and_history_id(${id},${historyId}) AS pending_sms`
	);
	return res;
};