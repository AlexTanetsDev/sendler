import { QueryResult } from 'pg';
import updateSendingPermission from '@/api-actions/updateSendingPermission';
import { ISendingHistoryResponce } from '@/globaltypes/historyTypes';

export default async function toggleSendingPermission(historyId: string): Promise<ISendingHistoryResponce | null> {
  try {
    const history: QueryResult<ISendingHistoryResponce> = await updateSendingPermission(historyId);

    return history.rows[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
