import { NextResponse } from 'next/server';
import db from '@/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, sms_count, money_count, paid } = body;

    const newPaid = await db.query(
      'INSERT INTO transactions_history (user_id, sms_count, money_count,paid ) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, sms_count, money_count, paid]
    );

    const newUserPaid = newPaid.rows[0];

    if (newUserPaid) {
      return NextResponse.json({ newUserPaid, message: 'Платіж збережено' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { user_id, paid, transaction_id } = body;

    const changePost = await db.query(
      'UPDATE transactions_history SET paid = $1 WHERE user_id = $2 AND transaction_id = $3 RETURNING *',
      [paid, user_id, transaction_id]
    );

    const newUserPaid = changePost.rows[0];

    if (newUserPaid) {
      return NextResponse.json({ newUserPaid, message: 'Платіж оновлено' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { user_id, description } = body;

    await db.query('UPDATE users SET description = $1 WHERE user_id = $2', [description, user_id]);

    return NextResponse.json(
      { message: `Опис для користувача з ID ${user_id} оновлено` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}


