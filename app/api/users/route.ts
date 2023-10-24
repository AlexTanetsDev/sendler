import {  NextResponse } from "next/server";
import db from "@/db";
import { hash } from "bcrypt";

// create User


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_login, tel, user_password, email } = body;
    const hashedPassword =  await hash( user_password, 10);
  
    const newUser = await db.query(
      "INSERT INTO users (user_login, tel, user_password, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_login, tel, hashedPassword, email]
    );
  
   
    
    const user = newUser.rows[0];
    const {user_password:NewUserPassword, ...rest} = user;
  
    
    return NextResponse.json({user:rest, message: 'User Created successfully'  }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!'}, {status: 50});
  }
 
}

// get all users
export async function GET() {
  
  try {
    const allUser = await db.query(
      "SELECT * FROM users"
    )
  
    const data = allUser.rows;
    return NextResponse.json({data},{status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!'}, {status: 50});
  }
}

