import { NextResponse, NextRequest } from 'next/server';
import db from '@/db';

import HttpError from '@/helpers/HttpError';
import { getUserHistory, createUserHistory } from '@/app/api/controllers/sending-history';
import { IErrorResponse, SmsStatusEnum } from '@/globaltypes/types';
import { IHistoryProps, IHistoryResponce } from '@/globaltypes/historyTypes';

export async function GET(
  req: NextRequest
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryProps>> {
  try {
    const { searchParams }: URL = new URL(req.url);
    const userId = Number(searchParams.get('userId'));
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');

    const startDate = start_date ? new Date(start_date) : undefined;
    const endDate = end_date ? new Date(end_date) : undefined;
    startDate?.setHours(0, 0, 0, 0);
    endDate?.setHours(23, 59, 59, 999);

    if (!userId) {
      return HttpError(400, `ID required for getting user's history`);
		}
		
    const query = `
            SELECT sh.history_id, sh.alfa_name, sh.sending_permission, sh.send_method, sh.text_sms, sh.sending_group_date, u.user_name, COALESCE(ARRAY_AGG(DISTINCT rs.recipient_status), ARRAY[CAST('pending' AS status_type)]) AS recipient_status, ARRAY_AGG(DISTINCT rs.client_id) AS clients
            FROM send_groups sg
            INNER JOIN sending_members sm ON sg.group_id = sm.group_id
            INNER JOIN sending_history sh ON sm.history_id = sh.history_id
            LEFT JOIN recipients_status rs ON rs.history_id = sh.history_id
            INNER JOIN users u ON sg.user_id = u.user_id
            WHERE u.user_id = $1 
            AND sh.sending_group_date >= $2 
            AND sh.sending_group_date <= $3
            GROUP BY sh.history_id, sh.alfa_name, sh.send_method, sh.text_sms, sh.sending_group_date, u.user_name
        `;
    const result = await db.query(query, [userId, startDate, endDate]);
    const userHistory: null | IHistoryResponce[] = result.rows;

    if (!userHistory) {
      return HttpError(400, `Failed to get user's history by userID = ${userId}`);
    }

    const formatedHistory = userHistory.map(history => {
      return {
        ...history,
        recipient_status: `${history.recipient_status as unknown as string}`
          ?.replace(/{|}/g, '')
          .split(',') as SmsStatusEnum[],
      };
    });

    return NextResponse.json(
      {
        history: formatedHistory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}