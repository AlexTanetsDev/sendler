import db from '@/db';
import { QueryResult } from 'pg';
import { ISendingHistoryResponce } from '@/globaltypes/historyTypes';

export default async function updateSendingPermission(
	historyId: string
): Promise<QueryResult<ISendingHistoryResponce>> {
	const query =
		`UPDATE sending_history
  SET sending_permission = NOT sending_permission
  WHERE sending_group_date > NOW() AND history_id = $1
	RETURNING *`;

	return await db.query(query, [historyId]);
}
