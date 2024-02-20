import db from "@/db";

export const addSendingHistory = async (idArray: number[], text: string): Promise<number> => {
	const res = await db.query(
		"INSERT INTO sending_history (text_sms) VALUES ($1) RETURNING *",
		[text]
	);

	const { history_id } = res.rows[0];

	for (let i = 0; i < idArray.length; i += 1) {
		await db.query(
			`INSERT INTO sending_members (group_id, history_id) values($1, $2) RETURNING *`,
			[idArray[i], history_id]
		)
	};
	return history_id;
};
