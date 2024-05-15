import { NextResponse } from 'next/server';
import db from '@/db';
import { updateUserBalance } from '@/api-actions';

export async function POST(req: Request) {
  // try {
    const body = await req.json();
    const { user_id, sms_count, money_count, paid, description } = body;

    const newPaid = await db.query(
      `INSERT INTO transactions_history (user_id, sms_count, money_count, paid, transactions_date, paymant_date, description ) VALUES ($1, $2, $3, $4, NOW(), ${
        paid ? 'NOW()' : 'NULL'
      }, $5) RETURNING *`,
      [user_id, sms_count, money_count, paid, description]
    );
    await updateUserBalance(user_id);

    const newUserPaid = newPaid.rows[0];

    if (newUserPaid) {
      return NextResponse.json({ newUserPaid, message: 'Платіж збережено' }, { status: 200 });
    }
  // } catch (error) {
  //   return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  // }
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

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { transactionId, sms_count, description } = body;

    const newPaid = await db.query(
      `UPDATE transactions_history SET sms_count = $2, description = $3, change_date = NOW() WHERE transaction_id = $1 RETURNING *`,
      [transactionId, sms_count, description]
    );

    const newUserPaid = newPaid.rows[0];

    if (newUserPaid) {
      return NextResponse.json(
        { newUserPaid, message: `${sms_count} SMS було знято з користувача. ` },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
