import { NextResponse } from 'next/server';
import db from '@/db';

export async function GET() {
  try {
    const getAllUsersAlfaNames = await db.query('SELECT * FROM sendler_name');

    const AllAlfaNames = getAllUsersAlfaNames.rows;

    if (AllAlfaNames) {
      return NextResponse.json({ AllAlfaNames, message: 'All users alfa names' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { alfa_name_id } = body;

    const isAlfaName = await db.query('SELECT * FROM sendler_name WHERE alfa_name_id = $1', [
      alfa_name_id,
    ]);

    if (isAlfaName.rows.length === 0) {
      throw new Error('Alfa name with given ID does not exist');
    }

    await db.query('UPDATE sendler_name SET alfa_name_active = TRUE WHERE alfa_name_id = $1', [
      alfa_name_id,
    ]);

    return NextResponse.json({ message: `Alfa name was activated` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { alfa_name_id } = body;

    const isAlfaName = await db.query('SELECT * from sendler_name WHERE alfa_name_id = $1', [
      alfa_name_id,
    ]);
    if (isAlfaName.rows.length === 0) {
      throw new Error('Alfa name with given ID does not exist');
    }

    await db.query('DELETE FROM sendler_name WHERE alfa_name_id = $1', [alfa_name_id]);

    return NextResponse.json(
      { message: `Alfa name with ID ${alfa_name_id} has been deleted` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json('Something went wrong!', { status: 500 });
  }
}

export async function PUT() {
  // try {
    const getAllUsersAlfaNames = await db.query(
      'SELECT balance, tel, user_active, user_login, email, alfa_name_id,  alfa_name, alfa_name_active, users.user_id, description  FROM  users  FULL OUTER JOIN sendler_name ON sendler_name.user_id = users.user_id;'
    );

    const users = await db.query('SELECT balance, tel, user_active, user_login, email, user_id, description FROM users');
    const alfaNames = await db.query('SELECT * FROM sendler_name');

    const mappedUsers = users.rows.map(user => {
      const userSendlerNames = alfaNames.rows
        .filter(item => item.user_id === user.user_id && item.alfa_name_active === true) // Dodaj warunek alfa_name_active === true
        .map(item => ({
          alfa_name_id: item.alfa_name_id,
          alfa_name: item.alfa_name,
          alfa_name_active: item.alfa_name_active,
        }));
    
      const alfaNameIds = userSendlerNames.map(item => item.alfa_name_id);
      const alfaName = userSendlerNames.map(item => item.alfa_name);
      const alfaNameActives = userSendlerNames.map(item => item.alfa_name_active);
    
      return {
        ...user,
        alfa_name_id: alfaNameIds,
        alfa_name: alfaName,
        alfa_name_active: alfaNameActives,
      };
    });

    const OnlyNotActiveAlfaNames = getAllUsersAlfaNames.rows.filter(
      el => el.alfa_name !== null && el.alfa_name_active === false
    );
    if (OnlyNotActiveAlfaNames && mappedUsers) {
      return NextResponse.json(
        { mappedUsers, OnlyNotActiveAlfaNames, message: 'All users alfa names' },
        { status: 200 }
      );
    }
  // } catch (error) {
  //   return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  // }
}
