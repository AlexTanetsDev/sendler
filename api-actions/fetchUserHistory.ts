import db from '@/db';

import { QueryResult } from 'pg';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';
import { SmsStatusEnum } from '@/globaltypes/types';

const DEFAULT_STATUS: SmsStatusEnum = 'pending';

export default async function fetchUserHistory(
  userId: number,
  { startDate, endDate }: IHistoryPeriod
): Promise<QueryResult<IHistoryResponce>> {
  if (!startDate || !endDate) {
    const query = `
            SELECT sh.history_id, sh.sending_permission, sh.send_method, sh.text_sms, sh.sending_group_date, sg.group_name, u.user_name, COALESCE(ARRAY_AGG(rs.recipient_status), ARRAY[CAST('pending' AS status_type)]) AS recipient_status, COALESCE(ARRAY_AGG(rs.client_id)) AS clients
            FROM send_groups sg
            INNER JOIN sending_members sm ON sg.group_id = sm.group_id
            INNER JOIN sending_history sh ON sm.history_id = sh.history_id
            LEFT JOIN recipients_status rs ON rs.history_id = sh.history_id
            INNER JOIN users u ON sg.user_id = u.user_id
            WHERE u.user_id = $1
            GROUP BY sh.history_id, sh.send_method, sh.text_sms, sh.sending_group_date, u.user_name, sg.group_name
        `;
    return await db.query(query, [userId]);
  }

  const query = `
            SELECT sh.history_id, sh.sending_permission, sh.send_method, sh.text_sms, sh.sending_group_date, sg.group_name, u.user_name, COALESCE(ARRAY_AGG(rs.recipient_status), ARRAY[CAST('pending' AS status_type)]) AS recipient_status, ARRAY_AGG(rs.client_id) AS clients
            FROM send_groups sg
            INNER JOIN sending_members sm ON sg.group_id = sm.group_id
            INNER JOIN sending_history sh ON sm.history_id = sh.history_id
            LEFT JOIN recipients_status rs ON rs.history_id = sh.history_id
            INNER JOIN users u ON sg.user_id = u.user_id
            WHERE u.user_id = $1 
            AND sh.sending_group_date >= $2 
            AND sh.sending_group_date <= $3
            GROUP BY sh.history_id, sh.send_method, sh.text_sms, sh.sending_group_date, u.user_name, sg.group_name
        `;

  return await db.query(query, [userId, startDate, endDate]);
}
