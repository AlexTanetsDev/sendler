import { NextResponse } from 'next/server';
import db from '@/db';

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

export async function GET() {
  try {
    const res = await db.query(
      `SELECT user_login, transactions_history.user_id, transaction_id, sms_count ,money_count, paid, transactions_date
    FROM users
    FULL OUTER JOIN transactions_history ON transactions_history.user_id = users.user_id
    WHERE transactions_history.paid = false `
    );
    const allDebts = res.rows;

    if (allDebts) {
      return NextResponse.json({ allDebts, message: 'All debts' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}

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
