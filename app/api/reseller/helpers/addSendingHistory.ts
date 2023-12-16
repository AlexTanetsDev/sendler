import db from "@/db";

export const addSendingHistory = async (group_id: string): Promise<number> => {
  const res = await db.query(
    "INSERT INTO sending_history (group_id) VALUES ($1) RETURNING *",
    [group_id]
  );
  return res.rows[0].history_id;
};
