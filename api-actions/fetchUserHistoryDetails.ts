import db from '@/db';
import { QueryResult } from 'pg';
import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

export default async function fetchUserHistoryDetails(
  historyId: string
): Promise<QueryResult<IHistoryDetailsResponce>> {
  const query = `
            SELECT cl.tel, cl.client_id, sh.text_sms, sh.sending_group_date, sg.group_name, u.user_name, ARRAY_AGG(rs.recipient_status) AS recipient_status
            FROM send_groups sg
            INNER JOIN sending_history sh ON sg.group_id = sh.group_id
            INNER JOIN recipients_status rs ON rs.history_id = sh.history_id
            INNER JOIN users u ON sg.user_id = u.user_id
						INNER JOIN groups_members gm ON sh.group_id = gm.group_id
            INNER JOIN clients cl ON gm.client_id = cl.client_id
						WHERE sh.history_id = $1 
            GROUP BY cl.tel, cl.client_id, sh.text_sms, sh.sending_group_date, u.user_name, sg.group_name
        WHERE history_id = $1
        RETURNING *
        `;

  return await db.query(query, [historyId]);
}
