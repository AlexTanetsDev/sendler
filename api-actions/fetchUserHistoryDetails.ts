import db from '@/db';
import { QueryResult } from 'pg';
import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

export default async function fetchUserHistoryDetails(
	historyId: string
): Promise<QueryResult<IHistoryDetailsResponce>> {
	const query = `
        SELECT cl.tel, cl.client_id, sh.alfa_name, sh.sending_permission, sh.text_sms, to_char(sending_group_date::timestamptz at time zone 'Europe/Vilnius', 'DD.MM.YYYY HH24:MI:SS') AS sending_group_date, sg.group_name, u.user_name, (
        SELECT ARRAY_AGG(rs.recipient_status)
        FROM recipients_status rs
        WHERE rs.history_id = sh.history_id AND rs.client_id = cl.client_id
    ) AS recipient_status
           FROM 
    clients cl
INNER JOIN 
    groups_members gm ON cl.client_id = gm.client_id
INNER JOIN 
    send_groups sg ON gm.group_id = sg.group_id
INNER JOIN 
    sending_members sm ON sg.group_id = sm.group_id
INNER JOIN 
    sending_history sh ON sm.history_id = sh.history_id
INNER JOIN 
    users u ON sg.user_id = u.user_id
LEFT JOIN 
    recipients_status rs ON rs.history_id = sh.history_id AND rs.client_id = cl.client_id
WHERE 
    sh.history_id = $1 
GROUP BY 
rs.history_id, sh.history_id,
    cl.tel, 
    cl.client_id, 
    sg.group_name,
    sh.alfa_name, 
    sh.sending_permission, 
    sh.text_sms, 
    sh.sending_group_date,
    u.user_name;
        `;

	return await db.query(query, [historyId]);
}
