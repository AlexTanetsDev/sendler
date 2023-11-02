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

  const { user_login, tel, email, user_name } = body;

  const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  const response = await db.query(
    "SELECT email, user_login, user_password, tel, user_name FROM users WHERE user_id = $1",
    [id]
  );

  const newDataUser = response.rows[0];

  if (!newDataUser) {
    return NextResponse.json(
      { user: null, message: `User with id ${id} not found` },
      { status: 404 }
    );
  }

  const updateUserName =
    user_name !== newDataUser.user_name && user_name !== ""
      ? user_name
      : newDataUser.user_name;

  const updateUserLogin =
    user_login !== newDataUser.user_login && user_login !== ""
      ? user_login
      : newDataUser.user_login;

  const updateTel =
    tel !== newDataUser.tel && tel !== null ? tel : newDataUser.tel;

  const updateEmail =
    email !== newDataUser.email && email !== "" ? email : newDataUser.email;

  const userData = await db.query(
    "UPDATE users SET user_login = $1, tel = $2,  email = $3, user_name = $4  WHERE user_id = $5 RETURNING *",
    [updateUserLogin, updateTel, updateEmail, updateUserName, id]
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

    await db.query("UPDATE users SET  user_password = $1 where user_id = $2", [
      newHashPassword,
      id,
    ]);

    return NextResponse.json({ message: `Password updated` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

//disactive user
export async function DELETE(req: Request) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  const response = await db.query(
    "SELECT user_active FROM users WHERE user_id = $1",
    [id]
  );

  const userActive = response.rows[0];

  if (!userActive) {
    return NextResponse.json(
      { user: null, message: `User with id ${id} not found` },
      { status: 404 }
    );
  }

  await db.query("UPDATE users SET  user_active = $1 where user_id = $2", [
    !userActive.user_active,
    id,
  ]);

  if (!userActive.user_active) {
    return NextResponse.json(
      { message: `User with id ${id} activited` },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: `User with id ${id} disactivited` },
    { status: 200 }
  );
}
