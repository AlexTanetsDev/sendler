import db from "@/db";

import { QueryResult } from "pg";
import { IResPendingdSms } from "@/globaltypes/types";

export default async function fetchUserPendingSms(id: number): Promise<QueryResult<IResPendingdSms>> {
	const res: QueryResult<IResPendingdSms> = await db.query(`SELECT get_pending_sms_by_user(${id}) AS pending_sms`
	);
	return res;
};