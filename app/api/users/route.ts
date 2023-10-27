import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { hash } from "bcrypt";

// create User

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_login, tel, user_password, email } = body;
    const hashedPassword = await hash(user_password, 10);

    //existing user by email
    const userEmail = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const existingUserByEmail = userEmail.rows[0];

    if (existingUserByEmail) {
      return NextResponse.json(
        { users: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    //existing user by name
    const userName = await db.query(
      "SELECT * FROM users WHERE user_login = $1",
      [user_login]
    );
    const existingUserByName = userName.rows[0];

    if (existingUserByName) {
      return NextResponse.json(
        { users: null, message: "User with this user name already exists" },
        { status: 409 }
      );
    }

    //existing user by phone
    const userTel = await db.query("SELECT * FROM users WHERE tel = $1", [tel]);
    const existingUserByTel = userTel.rows[0];

    if (existingUserByTel) {
      return NextResponse.json(
        { users: null, message: "User with this phone already exists" },
        { status: 409 }
      );
    }
    //create new user
    const newUser = await db.query(
      "INSERT INTO users (user_login, tel, user_password, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_login, tel, hashedPassword, email]
    );

    const userCreate = newUser.rows[0];
    const { user_password: NewUserPassword, ...rest } = userCreate;

    return NextResponse.json(
      { users: rest, message: "User Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

// GET all users
export async function GET() {
  try {
    const allUser = await db.query("SELECT * FROM users");
    const data = allUser.rows;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}