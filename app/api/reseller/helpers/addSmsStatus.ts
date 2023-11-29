import db from "@/db";
import { IClientsIdWithTel, SmsStatusEnum } from "@/globaltypes/types";

export const addSmsStatus = async (
  history_id: number,
  clients: IClientsIdWithTel[],
  status: SmsStatusEnum
) => {
  const query = clients
    .map((client) => {
      return `(${history_id}, ${client.client_id},'${status}')`;
    })
    .join(",");

  const res = await db.query(
    `INSERT INTO recipients_status (history_id, client_id, recipient_status) VALUES ${query} RETURNING * `
  );
  return res.rows;
};
