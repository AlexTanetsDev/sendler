import { NextResponse } from "next/server";
import db from "@/db";


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