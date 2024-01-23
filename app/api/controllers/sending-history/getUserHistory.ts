import { fetchUserHistory } from '@/app/utils';

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
    throw new Error(error.message);
  }
}
