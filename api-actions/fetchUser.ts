import db from "@/db";

import { QueryResult } from "pg";
import { NextResponse } from "next/server";

import { IUser } from "@/globaltypes/types";

export default async function fetchUser(id: string): Promise<IUser | NextResponse<{
	user: null;
	message: string;
}>> {

	const res: QueryResult<IUser> = await db.query(
		`SELECT balance, email, user_active, user_create_date, user_id, user_login, user_name, user_role, tel
  	FROM users
		WHERE user_id = ${id}`
	);

	if (!res) {
		return NextResponse.json(
			{ user: null, message: `User not found` },
			{ status: 404 }
		);
	}

	const resAlfaNames: QueryResult<{ alfa_name: string, alfa_name_active: boolean }> = await db.query(`SELECT alfa_name, alfa_name_active
	FROM sendler_name
	WHERE user_id = ${id}`
	);

	const alfaNamesActive: string[] = [];
	const alfaNamesDisable: string[] = [];

	for (const resAlfaName of resAlfaNames.rows) {
		if (resAlfaName.alfa_name_active) {
			alfaNamesActive.push(resAlfaName.alfa_name)
		} else {
			alfaNamesDisable.push(resAlfaName.alfa_name)
		}
	}

	const user = res.rows[0];
	user.alfa_names_active = alfaNamesActive;
	user.alfa_names_disable = alfaNamesDisable;

	return user;
};