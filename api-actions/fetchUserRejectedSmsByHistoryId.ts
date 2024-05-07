import db from "@/db";
import { IResRejectedSms } from "@/globaltypes/types";

import { QueryResult } from "pg";

export default async function fetchUserRejectedSmsByHistoryId(id: number | undefined, historyId: number): Promise<QueryResult<IResRejectedSms>> {
	const res: QueryResult<IResRejectedSms> = await db.query(
		`SELECT get_rejected_sms_by_user_and_history_id(${id}, ${historyId}) AS rejected_sms`
	);
	return res;
};