import { NextResponse } from "next/server";
import db from "@/db";
import { userActive } from "@/helpers/Users";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const isUserActive = await userActive(id);

    if (!isUserActive.user_active) {
      return NextResponse.json(
        { user: null, message: `User with id ${id} not active` },
        { status: 404 }
      );
    }

    const response = await db.query(
      "SELECT user_token FROM users WHERE user_id = $1",
      [id]
    );

    await db.query("UPDATE users SET  user_token = null where user_id = $1", [
      id,
    ]);

    return NextResponse.json(
      { user_token: null, message: `User logged out` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
