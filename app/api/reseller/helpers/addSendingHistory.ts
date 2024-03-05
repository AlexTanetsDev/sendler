import db from "@/db";
import { QueryResult } from "pg";

import { ISendHistoryDatabase } from "@/globaltypes/types";

export const addSendingHistory = async (idArray: number[], text: string, method: 'api' | 'veb', sending_date?: string): Promise<ISendHistoryDatabase> => {
	let res: QueryResult<ISendHistoryDatabase>;
	if (sending_date) {
		res = await db.query(
			"INSERT INTO sending_history (send_method, text_sms, sending_group_date) VALUES ($1, $2, $3) RETURNING *",
			[method, text, sending_date]
		);
	} else {
		res = await db.query(
			"INSERT INTO sending_history (send_method, text_sms) VALUES ($1, $2) RETURNING *",
			[method, text]
		);
	};

	const { history_id } = res.rows[0];

	for (let i = 0; i < idArray.length; i += 1) {
		await db.query(
			`INSERT INTO sending_members (group_id, history_id) values($1, $2)`,
			[idArray[i], history_id]
		)
	};
	return res.rows[0];
};
