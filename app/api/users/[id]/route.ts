import { NextResponse } from "next/server";
import db from "@/db";

// get user by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  const user = response[0];
  return NextResponse.json({ user: user });
}

// update user
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();
}

//delete user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();
}
