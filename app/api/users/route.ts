import { NextResponse } from "next/server";
import db from "@/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { login, tel, password, email } = body;

  const response = await db.query(
    "INSERT INTO users (login, tel, password, email) VALUES ($1, $2, $3, $4) RETURNING *",
    [login, tel, password, email]
  );
  const user = response[0];
  return NextResponse.json({ user: user }, { status: 201 });
}
