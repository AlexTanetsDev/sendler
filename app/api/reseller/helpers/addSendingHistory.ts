import db from "@/db";
import { QueryResult } from "pg";

import { ISendHistoryDatabase } from "@/globaltypes/types";

export const addSendingHistory = async (idArray: number[], text: string, method: 'api' | 'veb'): Promise<number> => {
	const res: QueryResult<ISendHistoryDatabase> = await db.query(
		"INSERT INTO sending_history (send_method, text_sms) VALUES ($1, $2) RETURNING *",
		[method, text]
	);

	const { history_id } = res.rows[0];

	for (let i = 0; i < idArray.length; i += 1) {
		await db.query(
			`INSERT INTO sending_members (group_id, history_id) values($1, $2)`,
			[idArray[i], history_id]
		)
	};
	return history_id;
};
