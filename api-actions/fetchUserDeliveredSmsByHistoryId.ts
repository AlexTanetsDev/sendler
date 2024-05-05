import db from "@/db";

import { QueryResult } from "pg";
import { IResDeliveredSms } from "@/globaltypes/types";

export default async function fetchUserDeliveredSms(id: number, historyId: number): Promise<QueryResult<IResDeliveredSms>> {
	const res: QueryResult<IResDeliveredSms> = await db.query(
		`SELECT get_delivered_sms_by_user_and_history_id(${id},${historyId}) AS delevered_sms`
	);
	return res;
};