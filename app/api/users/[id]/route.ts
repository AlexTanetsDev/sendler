import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log(params);

  const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  const user = response[0];
  return NextResponse.json({ user: user });
}
