import { NextResponse } from "next/server";
import db from "@/db";

import insertAlfaName from "@/api-actions/insertAlfaName";
import { schemaReqCreateAlfaName } from "@/models/users";
import { fetchUser } from "@/api-actions";
import addAlfaName from "../controllers/users/addAlfaName";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { login } = body;
		//select user_id by name_login

		const userData = await db.query(
			"SELECT user_id FROM users WHERE user_login = $1",
			[login]
		);

		const userId = userData.rows[0]?.user_id;

		if (userId) {
			return NextResponse.json(
				{ userId, message: "User id" },
				{ status: 200 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong!" },
			{ status: 500 }
		);
	}
};

export async function PATCH(
	req: Request,
	// { params }: { params: { id: string } }
) {
	try {
		// const id = params.id;
		const body = await req.json();

		const { error, value } = schemaReqCreateAlfaName.validate(body);

		if (error) {
			return NextResponse.json(
				{ message: error.details[0].message },
				{ status: 400 }
			);
		};

		const { alfa_name, user_id } = value;

		if (alfa_name?.length > 0) {
			// const user = await fetchUser(String(user_id));
			// const res = await insertAlfaName(alfa_name, user_id, false);
			const res = await addAlfaName(alfa_name, user_id);
			if (res === 1) {
				return NextResponse.json(
					{ message: `Name ${alfa_name} already exist!` },
					{ status: 400 }
				);
			}
			return NextResponse.json({ message: "Ім`я відправника надіслано на активацію. Після підтвердження ім`я відправника з`явиться у списку." });
		};

	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong!" },
			{ status: 500 }
		);
	};
};
