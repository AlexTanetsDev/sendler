import db from '@/db';

import { QueryResult } from 'pg';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';
import { SmsStatusEnum, SendMethodType } from '@/globaltypes/types';

const DEFAULT_STATUS: SmsStatusEnum = 'pending';
const sendMethod = 'api';

export default async function fetchUserHistory(
  userId: number,
  sendMethod: SendMethodType | null,
  { startDate, endDate }: IHistoryPeriod
): Promise<QueryResult<IHistoryResponce>> {
  const query = `
SELECT
    sh.history_id,
    sh.alfa_name,
    sh.sending_permission,
    sh.send_method,
    sh.text_sms,
    sh.sending_group_date,
    ARRAY_AGG(COALESCE(rs.recipient_status, 'pending')) AS recipient_status,
    (
        SELECT ARRAY_AGG(DISTINCT CONCAT(rs.client_id, rs.group_id))
        FROM recipients_status rs
        LEFT JOIN groups_members gm ON gm.client_id = rs.client_id
        WHERE rs.history_id = sh.history_id AND gm.group_id = rs.group_id
        ORDER BY 1
    ) AS clients
FROM
    sending_history sh
LEFT JOIN
    recipients_status rs ON rs.history_id = sh.history_id
LEFT JOIN 
    groups_members gm ON gm.group_id = rs.group_id AND gm.client_id = rs.client_id
JOIN 
    send_groups sg ON sg.group_id = rs.group_id
JOIN
    users u ON sg.user_id = u.user_id
WHERE 
    ($1 = -1 OR u.user_id = $1)
    AND (sh.send_method = $2 OR $2 IS NULL)
    AND (sh.sending_group_date >= $3 OR $3 IS NULL)
    AND (sh.sending_group_date <= $4 OR $4 IS NULL)
GROUP BY 
    sh.history_id, 
    sh.alfa_name, 
    sh.sending_permission, 
    sh.send_method, 
    sh.text_sms, 
    sh.sending_group_date, 
    u.user_name
ORDER BY sh.sending_group_date DESC;
        `;

  return await db.query(query, [userId, sendMethod, startDate, endDate]);
}
