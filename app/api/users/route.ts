import { NextResponse } from "next/server";
import db from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { login } = body;
    //select user_id by name_login

    const userData = await db.query(
      "SELECT user_id FROM users WHERE user_login = $1",
      [login]
    );

    const userId = userData.rows[0]?.user_id;

    if (userId) {
      return NextResponse.json(
        { userId, message: "User id" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
