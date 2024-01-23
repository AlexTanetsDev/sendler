import { insertNewUserHistory } from "@/app/utils";

import { QueryResult } from "pg";
import { IHistoryResponce } from "@/globaltypes/historyTypes";

export default async function createUserHistory(
  userId: number,
  textSMS: string
): Promise<IHistoryResponce | null> {
  try {
    const history: QueryResult<IHistoryResponce> = await insertNewUserHistory(userId, textSMS);

    return history.rows[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
}
