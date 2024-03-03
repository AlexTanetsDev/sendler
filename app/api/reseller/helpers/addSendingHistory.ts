import db from "@/db";

export const addSendingHistory = async (text: string, group_id: string): Promise<number> => {
  const res = await db.query('INSERT INTO sending_history (text_sms) VALUES ($1) RETURNING *', [
    text,
  ]);
  const history_id = res.rows[0].history_id;

  const sendingMembersRes = await db.query(
    'INSERT INTO sending_members (history_id, group_id) VALUES ($1, $2) RETURNING *',
    [history_id, group_id]
  );

  return res.rows[0].history_id;
};
