import { NextResponse } from "next/server";
import db from "@/db";
import { hash } from "bcrypt";

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
            if (dbUserPassword === hashedPassword) {
                return NextResponse.json(
                    { users: rest, message: "User login successfully" },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { users: null, messege: "Wrong password" },
                    { status: 401 }
                );
            }
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

