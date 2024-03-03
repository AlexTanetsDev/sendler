import db from '@/db';

import { QueryResult } from 'pg';
import { IPaymentHistory, IUserId } from '@/globaltypes/types';

export default async function getUserPaymentHistory(
  id: number
): Promise<QueryResult<IPaymentHistory>> {
  const res: QueryResult<IPaymentHistory> = await db.query(
    `SELECT * FROM transactions_history WHERE user_id = $1`,
    [id]
  );

  return res;
}
