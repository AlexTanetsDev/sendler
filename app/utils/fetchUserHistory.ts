import db from "@/db";

import { QueryResult } from "pg";
import { IHistoryResponce, IHistoryPeriod } from "@/globaltypes/historyTypes";

export default async function fetchUserHistory(
  userId: number,
  { startDate, endDate }: IHistoryPeriod
): Promise<QueryResult<IHistoryResponce>> {
  if (!startDate || !endDate) {
    const query = `
            SELECT sh.history_id, sh.sending_group_date, sg.group_name
            FROM send_groups sg
            INNER JOIN sending_history sh ON sg.group_id = sh.group_id
            INNER JOIN users u ON sg.user_id = u.user_id
            WHERE u.user_id = $1
        `;

    return await db.query(query, [userId]);
  }

  const query = `
            SELECT sh.history_id, sh.sending_group_date, sg.group_name
            FROM send_groups sg
            INNER JOIN sending_history sh ON sg.group_id = sh.group_id
            INNER JOIN users u ON sg.user_id = u.user_id
            WHERE u.user_id = $1 
            AND sh.sending_group_date >= $2 
            AND sh.sending_group_date <= $3
        `;

  return await db.query(query, [userId, startDate, endDate]);
}
