import db from "@/db";

export const addSmsStatus = async (group_id: string, client_id: string) => {
  const res = await db.query(
    "INSERT INTO recipients_status (group_id, client_id, recipient_status) VALUES ($1, $2, 'pending') RETURNING * ",
    [group_id, client_id]
  );
  return res.rows;
};
