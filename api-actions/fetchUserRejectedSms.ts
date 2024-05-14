import db from "@/db";

import { IResRejectedSms } from "@/globaltypes/types";
import { QueryResult } from "pg";

export default async function fetchUserRejectedSms(id: number): Promise<QueryResult<IResRejectedSms>> {
	const res: QueryResult<IResRejectedSms> = await db.query(
		`SELECT get_sms_by_user(${id}, 'rejected') AS rejected_sms`
	);
	return res;
};