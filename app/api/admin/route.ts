import { NextResponse } from 'next/server';
import db from '@/db';
import { updateUserBalance } from '@/api-actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, sms_count, money_count, paid } = body;

    const newPaid = await db.query(
      `INSERT INTO transactions_history (user_id, sms_count, money_count, paid, transactions_date, paymant_date ) VALUES ($1, $2, $3, $4, NOW(), ${
        paid ? 'NOW()' : 'NULL'
      }) RETURNING *`,
      [user_id, sms_count, money_count, paid]
    );
    await updateUserBalance(user_id);

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

export async function DELETE(req: Request) {
  try {
  const body = await req.json();
  const { user_id, sms_count } = body;

  const newPaid = await db.query(
    `INSERT INTO user_sms_adjustments (user_id, sms_count, create_time) VALUES ($1, $2, NOW()) RETURNING *`,
    [user_id, sms_count]
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
