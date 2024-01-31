import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serialize } from "cookie";
import db from "@/db";

import { compare } from "bcrypt";

import { generateToken } from "@/helpers/Users";


// login User

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { login, password } = body;
		const adminEmail = process.env.ADMIN_EMAIL;

		//select user by name_login
		const userData = await db.query(
			"SELECT * FROM users WHERE user_login = $1",
			[login]
		);

		const adminData = await db.query(
			"SELECT * FROM users WHERE email = $1",
			[adminEmail]
		);
		const adminPassword = adminData.rows[0].user_password;

		const selectedUser = userData.rows[0];

		const { user_login, user_id, email, user_password } = selectedUser;

		const isPasswordMatched = await compare(password, user_password);

		const isAdminPaswordMatched = await compare(password, adminPassword);

		if (selectedUser) {
			if (isPasswordMatched || isAdminPaswordMatched) {
				const token = await generateToken({
					userName: user_login,
					userEmail: email,
				});

				if (!token) {
					return NextResponse.json(
						{ message: "Token generation failed" },
						{ status: 500 }
					);
				}
				await db.query("UPDATE users SET  user_token = $1 where user_id = $2", [
					token,
					user_id,
				]);

				const userWithToken = await db.query(
					"SELECT * FROM users WHERE user_id = $1",
					[user_id]
				);

				const { user_password: disible, email: hiddenEmail, tel: hiddenTel, user_token:hiddenTokenclear,  ...rest } = userWithToken.rows[0];
				
				const cookie = serialize("token", token, {
					httpOnly: true,
					maxAge: 60 * 60 * 24, // Термін життя, наприклад, 24 години
					path: "/", // Шлях доступу
					sameSite: "strict", // Захист від CSRF-атак
				});
				return NextResponse.json(
					{ rest, message: "User login successfully" },
					{ status: 200, headers: { "Set-Cookie": cookie } }
				);
			} else {
				return NextResponse.json(
					{ user: null, messege: "Wrong password" },
					{ status: 401 }
				);
			}
		} else {
			return NextResponse.json(
				{ user: null, messege: "Login not found" },
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
