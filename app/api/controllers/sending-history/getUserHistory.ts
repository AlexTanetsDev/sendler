import fetchUserHistory from '@/api-actions/fetchUserHistory';

import { QueryResult } from 'pg';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';
import { SendMethodType } from '@/globaltypes/types';

export default async function getUserHistory(
  userId: number,
  sendMethod: SendMethodType | null,
  historyPeriod: IHistoryPeriod
): Promise<IHistoryResponce[] | null> {
  try {
    const history: QueryResult<IHistoryResponce> = await fetchUserHistory(
      userId,
      sendMethod,
      historyPeriod
    );

    return history.rows;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
