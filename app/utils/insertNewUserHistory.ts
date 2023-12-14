import db from "@/db";

import { QueryResult } from "pg";
import { IHistoryResponce } from "@/globaltypes/historyTypes";

export default async function insertNewUserHistory(
  groupId: number
): Promise<QueryResult<IHistoryResponce>> {
  const query = `
        INSERT INTO sending_history (group_id) VALUES ($1) RETURNING *;
      `;

  return await db.query(query, [groupId]);
}
