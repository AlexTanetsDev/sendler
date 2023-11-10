import { NextResponse } from "next/server";
import db from "@/db";
import { hash, compare } from "bcrypt";
import { IUser } from "@/globaltypes/types";
import { schemaNewDateUser, schemaUpdateUserPassword } from "@/models/users";
import { AllUserWithFild, userActive } from "@/helpers/Users";

// update user
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const id = params.id;

  const { error, value } = schemaNewDateUser.validate(body);

  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );
  }

  const { user_login, tel, email, user_name } = value;


  const isUserActive = await userActive(id);

  if (!isUserActive) {
    return NextResponse.json(
      { user: null, message: `User with id ${id} not active` },
      { status: 404 }
    );
  }

  const response = await db.query(
    "SELECT email, user_login, tel, user_name FROM users WHERE user_id = $1",
    [id]
  );

  const newDataUser = response.rows[0];

  if (!newDataUser) {
    return NextResponse.json(
      { user: null, message: `User with id ${id} not found` },
      { status: 404 }
    );
  }

  const userName = await AllUserWithFild(
    id,
    "user_name",
    user_name,
    newDataUser
  );

  const {
    isUniqueUserFild: isUniqueUserName,
    updateUserColumnName: updateUserName,
  } = userName;

  if (isUniqueUserName) {
    return NextResponse.json(
      { message: `User name already exists` },
      { status: 409 }
    );
  }

  const userLogin = await AllUserWithFild(
    id,
    "user_login",
    user_login,
    newDataUser
  );

  const {
    isUniqueUserFild: isUniqueUserLogin,
    updateUserColumnName: updateUserLogin,
  } = userLogin;

  if (isUniqueUserLogin) {
    return NextResponse.json(
      { message: `User login already exists` },
      { status: 409 }
    );
  }

  const userTel = await AllUserWithFild(id, "tel", tel, newDataUser);

  const {
    isUniqueUserFild: isUniqueUserTel,
    updateUserColumnName: updateUserTel,
  } = userTel;

  if (isUniqueUserTel) {
    return NextResponse.json(
      { message: `User phone already exists` },
      { status: 409 }
    );
  }

  const userEmail = await AllUserWithFild(id, "email", email, newDataUser);

  const {
    isUniqueUserFild: isUniqueUserEmail,
    updateUserColumnName: updateUserEmail,
  } = userEmail;

  if (isUniqueUserEmail) {
    return NextResponse.json(
      { message: `User email already exists` },
      { status: 409 }
    );
  }

  const userData = await db.query(
    "UPDATE users SET user_login = $1, tel = $2, email = $3, user_name = $4  WHERE user_id = $5 RETURNING *",
    [updateUserLogin, updateUserTel, updateUserEmail, updateUserName, id]
  );

  const user = userData.rows[0];
  const { user_password: NewUserPassword, ...rest } = user;

  return NextResponse.json(
    { user: rest, message: `User with id ${id} apdated` },
    { status: 200 }
  );
}

//update password

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    const { error, value } = schemaUpdateUserPassword.validate(body);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const { oldPassword, newPassword } = value;

    const isTheSamePassword = oldPassword === newPassword;

    if (isTheSamePassword) {
      return NextResponse.json(
        { message: " This the same password " },
        { status: 400 }
      );
    }

    const isUserActive = await userActive(id);

    if (!isUserActive.user_active) {
      return NextResponse.json(
        { user: null, message: `User with id ${id} not active` },
        { status: 404 }
      );
    }

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

    const isPasswordMatched = await compare(oldPassword, userPassword);

    if (!isPasswordMatched) {
      return NextResponse.json(
        { user: null, message: `Old password is incorrect` },
        { status: 400 }
      );
    }

    const newHashPassword = await hash(newPassword, 10);

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
