import { NextResponse } from "next/server";
import db from "@/db";


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  // try {
    const body = await req.json();
    const user_id  = params.id;

    const isUser = await db.query('SELECT * from users WHERE user_id = $1', [
      user_id,
    ]);
    if (isUser.rows.length === 0) {
      throw new Error('User with given ID does not exist');
    }

    await db.query("UPDATE users SET  user_active = false where user_id = $1", [user_id]);

    return NextResponse.json(
      { message: `User with  ID ${user_id} has been disactive` },
      { status: 200 }
    );
  // } catch (error) {
  //   return NextResponse.json('Something went wrong!', { status: 500 });
  // }
}