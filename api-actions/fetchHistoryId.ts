import db from "@/db";
import { QueryResult } from "pg";

import { ISendHistoryDatabase } from "@/globaltypes/types";

export default async function fetchHistoryId(id: number): Promise<ISendHistoryDatabase> {

	const res: QueryResult<ISendHistoryDatabase> = await db.query(
		`SELECT send_method, text_sms, sending_group_date, sending_permission
		FROM sending_history
		WHERE history_id = ${id}`
	);

	return res.rows[0];
};