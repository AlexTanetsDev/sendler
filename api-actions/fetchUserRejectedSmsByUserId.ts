import db from "@/db";

import { IResRejectedSms } from "@/globaltypes/types";
import { QueryResult } from "pg";

export default async function fetchUserRejectedSmsByUserId(id: number): Promise<QueryResult<IResRejectedSms>> {
	const res: QueryResult<IResRejectedSms> = await db.query(
		`SELECT get_rejected_sms_by_user_id(${id}) AS rejected_sms`
	);
	return res;
};