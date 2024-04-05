import db from "@/db";

import { QueryResult } from "pg";

export default async function fetchUserRejectedSmsByHistoryId(id: number, historyId: number): Promise<number | null> {
	const res: QueryResult<any> = await db.query(`SELECT get_rejected_sms_by_user_and_history_id(${id}, ${historyId}) AS rejected_sms`
	);
	if (!res) {
		return null;
	};

	const sentSms = Number(res.rows[0].rejected_sms);
	return sentSms;
};