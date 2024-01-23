import { fetchUserHistory, fetchUserHistoryDetails } from '@/app/utils';

import { QueryResult } from 'pg';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';

export default async function getUserHistoryDetails(historyId: string): Promise<IHistoryResponce[] | null> {
  try {
    const history: QueryResult<IHistoryResponce> = await fetchUserHistoryDetails(historyId);

    return history.rows;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
