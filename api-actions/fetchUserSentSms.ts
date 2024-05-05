import db from "@/db";

import { QueryResult } from "pg";
import { IResSentdSms } from "@/globaltypes/types";

export default async function fetchUserSentSms(id: number): Promise<QueryResult<IResSentdSms>> {
	const res: QueryResult<IResSentdSms> = await db.query(
		`SELECT get_sent_sms_by_user(${id}) AS sent_sms`
	);
	return res;
};