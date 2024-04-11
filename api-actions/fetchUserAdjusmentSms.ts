import db from "@/db";

import { QueryResult } from "pg";

export default async function fetchUserAdjusmentSms(id: number): Promise<number | null | undefined> {
	try {
		const res: QueryResult<any> = await db.query(
			`SELECT SUM(sms_count)
		FROM user_sms_adjustments
		WHERE user_id = ${id}`
		);
		if (!res) {
			return null;
		};

		const sentSms = Number(res.rows[0].sum);
		return sentSms;
	} catch (error) { };
};