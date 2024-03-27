import db from "@/db";

import { QueryResult } from "pg";

export default async function fetchUserPaidSms(id: number): Promise<number | null> {
	const res: QueryResult<any> = await db.query(`SELECT get_paid_sms_by_user (${id}) AS paid_sms`
	);

	if (!res) {
		return null;
	};

	const paidSms = Number(res.rows[0].paid_sms);
	return paidSms;
};