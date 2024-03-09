import db from "@/db";
import { QueryResult } from "pg";

import { ISendHistoryDatabase } from "@/globaltypes/types";

export const addSendingHistory = async (idArray: number[], text: string, method: 'api' | 'veb', second?: number): Promise<ISendHistoryDatabase> => {
	let res: QueryResult<ISendHistoryDatabase>;
	// now() + interval '${second} second'
	if (second) {
		res = await db.query(
			`INSERT INTO sending_history (send_method, text_sms, sending_group_date) VALUES ('${method}', '${text}', now()::timestamp(0) + interval '${second} second') RETURNING *`
		);
	} else {
		res = await db.query(
			`INSERT INTO sending_history (send_method, text_sms) VALUES ('${method}', '${text}') RETURNING *`,
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
