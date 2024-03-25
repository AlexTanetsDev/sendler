import db from "@/db";

import { QueryResult } from "pg";

export default async function fetchQuantitySentSms(id: number): Promise<number | null> {
	const res: QueryResult<any> = await db.query(`SELECT get_sent_sms_by_user(${id}) AS sent_sms`
	);
	if (!res) {
		return null;
	};
	const sentSms = Number(res.rows[0].sent_sms);
	return sentSms;
};