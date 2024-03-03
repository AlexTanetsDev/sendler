import db from '@/db';
import { IClientsIdWithTel, SmsStatusEnum } from '@/globaltypes/types';

export const addSmsStatus = async (
  history_id: number,
  clients: IClientsIdWithTel[],
  status: SmsStatusEnum,
  identificators: string[]
) => {
  const factor = identificators.length / clients.length;
  let counter = 0;
  let interval = 1;
  const query = identificators
    .map(identificator => {
      const str = `(${history_id}, ${clients[counter].client_id}, '${status}', '${identificator}')`;
      if (interval === factor) {
        counter += 1;
        interval = 1;
      } else {
        interval += 1;
      }
      return str;
    })
    .join(',');

  const res = await db.query(
    `INSERT INTO recipients_status (history_id, client_id, recipient_status, identificator) VALUES ${query} RETURNING *`
  );

  return res.rows;
};
