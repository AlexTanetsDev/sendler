import db from "@/db";
import { IResUserRejectedSmsByHistoryId } from "@/globaltypes/types";

import { QueryResult } from "pg";

export default async function fetchUserRejectedSmsByHistoryId(id: number | undefined, historyId: number): Promise<number | null> {
	const res: QueryResult<IResUserRejectedSmsByHistoryId> = await db.query(`SELECT get_rejected_sms_by_user_and_history_id(${id}, ${historyId}) AS rejected_sms`
	);
	if (!res) {
		return null;
	};
	const rejectedSms = res.rows[0].rejected_sms;
	return rejectedSms;
};