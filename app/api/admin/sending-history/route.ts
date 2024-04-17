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

    const result: null | IHistoryResponce[] = await getUserHistory(userId, {
      startDate,
      endDate,
    });

    if (!result) {
      return HttpError(400, `Failed to get user's history by userID = ${userId}`);
    }

    const formatedHistory = result.map(history => {
      return {
        ...history,
        recipient_status: `${history.recipient_status as unknown as string}`
          ?.replace(/{|}/g, '')
          .split(',') as SmsStatusEnum[],
      };
    });

    return NextResponse.json({
      history: formatedHistory,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { user_id } = body;

    const userById = await db.query('SELECT * FROM transactions_history WHERE user_id = $1 ', [
      user_id,
    ]);
    const userTransactionsHistory = userById.rows;

    if (userTransactionsHistory.length === 0) {
      return NextResponse.json(
        { data: null, message: `Користувач з ID ${user_id} не має жодної історії транзакцій` },
        { status: 200 }
      );
    }

    return NextResponse.json({ userTransactionsHistory }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}

// export async function GET() {
//   try {
//     const res = await db.query(
//       `SELECT user_login, transactions_history.user_id, transaction_id, sms_count ,money_count, paid, transactions_date
//     FROM users
//     FULL OUTER JOIN transactions_history ON transactions_history.user_id = users.user_id
//     WHERE transactions_history.paid = false `
//     );
//     const allDebts = res.rows;

//     if (allDebts) {
//       return NextResponse.json({ allDebts, message: 'All debts' }, { status: 200 });
//     }
//   } catch (error) {
//     return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
//   }
// }

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { transaction_id } = body;

    await db.query(
      'UPDATE transactions_history SET paid = true, paymant_date = NOW() WHERE transaction_id = $1 ',
      [transaction_id]
    );

    return NextResponse.json({ message: 'Рахунек оплачено' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
