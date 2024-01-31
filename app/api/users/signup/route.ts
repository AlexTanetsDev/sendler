import { NextResponse } from 'next/server';
import db from '@/db';
import { hash } from 'bcrypt';
import { schemaCreateNewUser } from '@/models/users';
import { generateToken } from '@/helpers/Users';

// create User
export async function POST(req: Request) {
  try {
  const body = await req.json();

  const { error, value } = schemaCreateNewUser.validate(body);

  if (error) {
    return NextResponse.json({ message: error.details[0].message }, { status: 400 });
  }

  const { user_login, tel, user_password, email, user_name } = value;

  const hashedPassword = await hash(user_password, 10);

  //existing user by email
  const userEmail = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const existingUserByEmail = userEmail.rows[0];

  if (existingUserByEmail) {
    return NextResponse.json(
      { users: null, message: 'Користувач із цією електронною адресою вже існує.' },
      { status: 409 }
    );
  }

  //existing user by login
  const userLogin = await db.query('SELECT * FROM users WHERE user_login = $1', [user_login]);
  const existingUserByLogin = userLogin.rows[0];
  if (existingUserByLogin) {
    return NextResponse.json(
      { users: null, message: 'Користувач із цим логіном вже існує.' },
      { status: 409 }
    );
  }

  //existing user by phone
  const userTel = await db.query('SELECT * FROM users WHERE tel = $1', [tel]);
  const existingUserByName = userTel.rows[0];
  if (existingUserByName) {
    return NextResponse.json(
      { users: null, message: 'Користувач із цим номером телефону вже існує' },
      { status: 409 }
    );
  }

  //existing user by user name
  const userName = await db.query('SELECT * FROM users WHERE user_name = $1', [user_name]);
  const existingUserByTel = userName.rows[0];
  if (existingUserByTel) {
    return NextResponse.json(
      { users: null, message: 'Користувач із цим ім"ям вже існує.' },
      { status: 409 }
    );
  }
  const token = await generateToken({
    userName: user_login,
    userEmail: email,
  });
  if (!token) {
    return NextResponse.json({ message: 'Token generation failed' }, { status: 500 });
  }
  //create new user
  const newUser = await db.query(
    'INSERT INTO users (user_login, tel, user_password, email, user_name, user_token ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [user_login, tel, hashedPassword, email, user_name, token]
  );

  const userCreate = newUser.rows[0];
  const { user_password: NewUserPassword, ...rest } = userCreate;

  return NextResponse.json({ users: rest, message: 'User Created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
