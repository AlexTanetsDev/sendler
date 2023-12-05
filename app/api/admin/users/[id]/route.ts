import { NextResponse } from "next/server";
import db from "@/db";
import { IUser } from "@/globaltypes/types";

// get user by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    const user: IUser = response.rows[0];

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

//disactive user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

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
