import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serialize } from "cookie";
import db from "@/db";
import { hash, compare } from "bcrypt";
import { generateToken } from "@/helpers/Users";

// login User

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_login, user_password } = body;
    const hashedPassword = await hash(user_password, 10);

    //select user by name_login
    const userData = await db.query(
      "SELECT * FROM users WHERE user_login = $1",
      [user_login]
    );
    const selectedUser = userData.rows[0];
    const { user_password: dbUserPassword, ...rest } = selectedUser;

    if (selectedUser) {
      const isCorectPassword = await compare(user_password, dbUserPassword);

      if (!isCorectPassword) {
        return NextResponse.json(
          { users: null, messege: "Wrong password" },
          { status: 401 }
        );
      }

      const token = await generateToken({
        userPassword: user_password,
        userEmail: rest.email,
      });
        
      if (!token) {
        return NextResponse.json(
          { message: "Token generation failed" },
          { status: 500 }
        );
        }
        
         await db.query(
           "UPDATE users SET  user_token = $1 where user_id = $2",
           [token, rest.user_id]
         );

      const cookie = serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // Термін життя, наприклад, 24 години
        path: "/", // Шлях доступу
        sameSite: "strict", // Захист від CSRF-атак
      });
        
      return NextResponse.json(
        { users: rest, message: "User login successfully" },
        {
          status: 200,
          headers: { "Set-Cookie": cookie },
        }
      );
    } else {
      return NextResponse.json(
        { users: null, messege: "Login not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
