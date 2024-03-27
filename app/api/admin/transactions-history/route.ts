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
