import db from "@/db";

import { QueryResult } from "pg";
import { IResPendingSms } from "@/globaltypes/types";

export default async function fetchUserPendingSms(id: number): Promise<QueryResult<IResPendingSms>> {
	const res: QueryResult<IResPendingSms> = await db.query(
		`SELECT get_sms_by_user(${id}, 'pending') AS pending_sms`
	);
	return res;
};