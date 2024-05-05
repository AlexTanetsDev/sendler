import db from "@/db";

import { QueryResult } from "pg";
import { IResAjustmentSms } from "@/globaltypes/types";

export default async function fetchUserAdjusmentSms(id: number): Promise<QueryResult<IResAjustmentSms>> {
	const res: QueryResult<IResAjustmentSms> = await db.query(
		`SELECT SUM(sms_count)
		FROM user_sms_adjustments
		WHERE user_id = ${id}`
	);
	return res;
};