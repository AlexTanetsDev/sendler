import { NextResponse } from "next/server";
import db from "@/db";
import { hash, compare } from "bcrypt";

// get user by ID
export async function GET(req: Request) {
  try {
    const id = req.url.slice(req.url.lastIndexOf("/") + 1);
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    const user = response.rows[0];

    if (!user) {
      return NextResponse.json(
        { user: [], message: `User not found` },
        { status: 404 }
      );
    }

    const { user_password: NewUserPassword, ...rest } = user;

    return NextResponse.json({ user: rest });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

// update user
export async function PUT(req: Request) {
  const body = await req.json();

  const { user_login, tel, email } = body;

  const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  const response = await db.query(
    "SELECT email, user_login, user_password, tel FROM users WHERE user_id = $1",
    [id]
  );

  const newDataUser = response.rows[0];

  if (!newDataUser) {
    return NextResponse.json(
      { user: null, message: `User with id ${id} not found` },
      { status: 404 }
    );
  }

  const updateUserLogin =
    user_login !== newDataUser.user_login && user_login !== ""
      ? user_login
      : newDataUser.user_login;

  const updateTel =
    tel !== newDataUser.tel && tel !== null ? tel : newDataUser.tel;

  const updateEmail =
    email !== newDataUser.email && email !== "" ? email : newDataUser.email;

  const userData = await db.query(
    "UPDATE users SET user_login = $1, tel = $2,  email = $3  WHERE user_id = $4 RETURNING *",
    [updateUserLogin, updateTel, updateEmail, id]
  );

  const user = userData.rows[0];
  const { user_password: NewUserPassword, ...rest } = user;

  return NextResponse.json(
    { user: rest, message: `User with id ${id} apdated` },
    { status: 200 }
  );
}

//update password

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { oldPassword, newPassword } = body;

    const trimmedOldPassword = oldPassword.trim();

    const trimmedNewPassword = newPassword.trim();

    const id = req.url.slice(req.url.lastIndexOf("/") + 1);

    const response = await db.query(
      "SELECT user_password FROM users WHERE user_id = $1",
      [id]
    );

    const userPassword = response.rows[0].user_password;

    if (!userPassword) {
      return NextResponse.json(
        { user: null, message: `User with id ${id} not found` },
        { status: 404 }
      );
    }

    const isPasswordMatched = await compare(trimmedOldPassword, userPassword);

    if (!isPasswordMatched) {
      return NextResponse.json(
        { user: null, message: `Old password is incorrect` },
        { status: 400 }
      );
    }

    const newHashPassword = await hash(trimmedNewPassword, 10);

    const userData = await db.query(
      "UPDATE users SET  user_password = $1 where user_id = $2",
      [newHashPassword, id]
    );

    return NextResponse.json({ message: `Password updated` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

//delete user
export async function DELETE(req: Request) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const user = await db.query(
    "DELETE FROM users WHERE user_id = $1  RETURNING *",
    [id]
  );
  const data = user.rows[0];

  if (!data) {
    return NextResponse.json(
      { message: `User with id ${id} not found` },
      { status: 404 }
    );
  }

  const { user_password: NewUserPassword, ...rest } = data;
  return NextResponse.json(
    { user: rest, message: `User with id ${id} deleted` },
    { status: 200 }
  );
}
