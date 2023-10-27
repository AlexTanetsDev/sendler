import { NextResponse } from "next/server";
import db from "@/db";

// get user by ID
export async function GET({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { message: `Bad request` },
      { status: 400 }
    );
  }

  const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  const user = response.rows;
  return NextResponse.json({ user: user });
}

// update user
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { user_login, tel, email } = body;
  const id = params.id;
  const response = await db.query(
    "SELECT email, user_login, user_password, tel FROM users WHERE user_id = $1",
    [id]
  );
  const newDataUser = response.rows[0];

  const updateUser_login =
    user_login !== newDataUser.user_login ? user_login : newDataUser.user_login;
  const updateTel = tel !== newDataUser.tel ? tel : newDataUser.tel;
  const updateEmail = email !== newDataUser.email ? email : newDataUser.email;

  const userData = await db.query(
    "UPDATE users SET user_login = $1, tel = $2,  email = $3  WHERE user_id = $4 RETURNING *",
    [updateUser_login,  updateTel, updateEmail, id]
  );

  const user = userData.rows[0];
  const { user_password: NewUserPassword, ...rest } = user;

  return NextResponse.json(
    { user: rest, message: `User with id=${id} was apdated` },
    { status: 200 }
  );
}

//delete user
export async function DELETE({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await db.query(
    "DELETE FROM users WHERE user_id = $1  RETURNING *",
    [id]
  );
  const data = user.rows;

  if (data.length === 0) {
    return NextResponse.json(
      { message: `User with id=${id} not found` },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { user: null, message: `User with id=${id} was deleted` },
    { status: 200 }
  );
}
