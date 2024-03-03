import fetchUserHistoryDetails from '@/api-actions/fetchUserHistoryDetails';
import { QueryResult } from 'pg';
import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

export default async function getUserHistoryDetails(
  historyId: string
): Promise<IHistoryDetailsResponce[] | null> {
  try {
    const history: QueryResult<IHistoryDetailsResponce> = await fetchUserHistoryDetails(historyId);

    return history.rows;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
