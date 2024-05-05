import fetchUserHistory from '@/api-actions/fetchUserHistory';

import { QueryResult } from 'pg';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';

export default async function getUserHistory(
  userId: number,
  historyPeriod: IHistoryPeriod
): Promise<IHistoryResponce[] | null> {
  try {
    const history: QueryResult<IHistoryResponce> = await fetchUserHistory(userId, historyPeriod);

    return history.rows;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
