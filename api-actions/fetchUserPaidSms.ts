import db from "@/db";

import { QueryResult } from "pg";
import { IResPaidSms } from "@/globaltypes/types";

export default async function fetchUserPaidSms(id: number): Promise<QueryResult<IResPaidSms>> {
	const res: QueryResult<IResPaidSms> = await db.query(
		`SELECT get_paid_sms_by_user (${id}) AS paid_sms`
	);
	return res;
};