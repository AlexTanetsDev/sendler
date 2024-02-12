import { NextResponse } from "next/server";
import db from "@/db";
import { hash, compare } from "bcrypt";
import bcrypt from 'bcrypt';
import { QueryResult } from "pg";
import { schemaNewDateUser, schemaUpdateUserPassword } from "@/models/users";
import { userActive } from "@/helpers/Users";
import { IUser } from "@/globaltypes/types";
import { fetchUser } from "@/api-actions";


export async function GET(req: Request, { params }: { params: { id: string } }) {
	const id = params.id;

	const user = await fetchUser(id);

	if (user) {
		return NextResponse.json(
			{ user },
			{ status: 200 }
		);
	};

	// const res: QueryResult<IUser> = await db.query(
	// 	`SELECT balance, email, user_active, user_create_date, user_id, user_login, user_name, user_role, tel
	// 	FROM users
	// 	WHERE user_id = ${id}`
	// );

	// const resAlfaNames = await db.query(`SELECT alfa_name
	// FROM sendler_name
	// WHERE user_id = ${id}`
	// );

	// const alfaNames = [];

	// for (const name of resAlfaNames.rows) {
	// 	alfaNames.push(name.alfa_name)
	// }

	// if (!res) {
	// 	return NextResponse.json(
	// 		{ user: null, message: `User not found` },
	// 		{ status: 404 }
	// 	);
	// }

	// const user = res.rows[0];
	// user.alfa_names = alfaNames;

	// console.log('user', user)

	// if (res) {
	// 	return NextResponse.json(
	// 		{ user },
	// 		{ status: 200 }
	// 	);
	// };

};

// update user
export async function PUT(req: Request, { params }: { params: { id: string } }): Promise<NextResponse<{
	message: string;
}>> {
	const body = await req.json();
	const id = params.id;

	const { error, value } = schemaNewDateUser.validate(body);

	if (error) {
		return NextResponse.json(
			{ message: error.details[0].message },
			{ status: 400 }
		);
	};

	const { userLogin, tel, email, password, newPassword, userName } = value;

	const isUserActive = await userActive(id);

	if (!isUserActive) {
		return NextResponse.json(
			{ user: null, message: `User not active` },
			{ status: 404 }
		);
	};

	const resUserData = await db.query(
		"SELECT email, user_login, tel, user_password FROM users WHERE user_id = $1",
		[id]
	);

	const newUserData = resUserData.rows[0];

	if (!newUserData) {
		return NextResponse.json(
			{ user: null, message: `User not found` },
			{ status: 404 }
		);
	};

	const isAuthenticated = await bcrypt.compare(password, newUserData.user_password);

	if (!isAuthenticated) {
		return NextResponse.json(
			{ message: `Sorry.Your password is rong.` },
			{ status: 400 }
		);
	};

	const resUsersLogin = await db.query(
		`SELECT user_login FROM users`
	);

	if (!(newUserData.user_login === userLogin)) {

		const usersLoginInDtabase = resUsersLogin.rows;

		const notUniqueUserLogin = usersLoginInDtabase.find(userLoginInDtabase => userLoginInDtabase.user_login === userLogin);

		if (notUniqueUserLogin) {
			return NextResponse.json(
				{ message: `Sorry.Your new login is not unique.` },
				{ status: 400 }
			);
		}
	};

	const newHashedPassword = await bcrypt.hash(newPassword, 10);

	const res: QueryResult<IUser> = await db.query("UPDATE users SET user_login = $1,  user_password = $2, tel = $3, email = $4, user_name = $5 where user_id = $6 RETURNING balance, email, user_active, user_create_date, user_id, user_login, user_name, user_role, tel", [
		userLogin,
		newHashedPassword,
		tel,
		email,
		userName,
		id,
	]);

	return NextResponse.json(
		{ res: res, message: `User has been apdated` },
		{ status: 200 }
	);
}

//update password

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const body = await req.json();

		const { error, value } = schemaUpdateUserPassword.validate(body);

		if (error) {
			return NextResponse.json(
				{ message: error.details[0].message },
				{ status: 400 }
			);
		};

		const { oldPassword, newPassword } = value;

		const isTheSamePassword = oldPassword === newPassword;

		if (isTheSamePassword) {
			return NextResponse.json(
				{ message: " This the same password " },
				{ status: 400 }
			);
		};

		const isUserActive = await userActive(id);

		if (!isUserActive.user_active) {
			return NextResponse.json(
				{ user: null, message: `User with id ${id} not active` },
				{ status: 404 }
			);
		}

		const response = await db.query(
			"SELECT user_password FROM users WHERE user_id = $1",
			[id]
		);

		const userPassword = response.rows[0].user_password;

		if (!userPassword) {
			return NextResponse.json(
				{ user: null, message: `User with id ${id} not found` },
				{ status: 404 }
			);
		};

		const isPasswordMatched = await compare(oldPassword, userPassword);

		if (!isPasswordMatched) {
			return NextResponse.json(
				{ user: null, message: `Old password is incorrect` },
				{ status: 400 }
			);
		};

		const newHashPassword = await hash(newPassword, 10);

		await db.query("UPDATE users SET  user_password = $1 where user_id = $2", [
			newHashPassword,
			id,
		]);

		return NextResponse.json({ message: `Password updated` }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong!" },
			{ status: 500 }
		);
	};
}
