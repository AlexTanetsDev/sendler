import {
	NextRequest,
	NextResponse
} from "next/server";

import {
	getGroupsByUserId,
	createGroup
} from '@/app/api/controllers/sending-groups';

import HttpError from '@/helpers/HttpError';

import { IQieryParamsCreateGroup } from "./types";
import {
	IGroupDatabase,
	ErrorCase
} from "@/globaltypes/types";

import {
	schemaReqCreateGroup
} from "@/models/sending-groups";


// get all groups for one user with user_id from search params
export async function GET(request: NextRequest): Promise<NextResponse<{
	error: string;
}> | NextResponse<{
	groups: IGroupDatabase[];
}> | NextResponse<{
	message: string;
	error: any;
}>> {

	const { searchParams }: URL = new URL(request.url);
	const userId = Number(searchParams.get("userId"));

	//checking user_id existense
	if (userId) {
		try {
			const res: null | IGroupDatabase[] = await getGroupsByUserId(userId);

			if (res === null) {
				return HttpError(400, `The user with id = ${userId} does not exist.`);
			}

			if (res === undefined) {
				return HttpError(400, `The user with id = ${userId} have not any groups.`);
			}

			return NextResponse.json(
				{ groups: res },
				{ status: 200 }
			);
		} catch (error: any) {
			return NextResponse.json(
				{ message: "Failed to get a list of group.", error: error.message },
				{ status: 500, }
			);
		}
	}

	return HttpError(400, `No userId`);
}

// create sending group for user with user_id from search params
export async function POST(request: NextRequest): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: any; }> | NextResponse<string>> {

	try {
		const body: IQieryParamsCreateGroup = await request.json();
		const { error, value } = schemaReqCreateGroup.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		}

		const { group_name } = value;
		const { searchParams }: URL = new URL(request.url);
		const userId = Number(searchParams.get("userId"));
		const method = request.method;

		if (!group_name) {
			return HttpError(400, `The input does not contain the group name.`);
		}

		const res: IGroupDatabase | ErrorCase | NextResponse<{
			error: string;
		}> = await createGroup(group_name, userId, method);

		switch (res) {
			case 1:
				{
					return HttpError(400, `The user with id = ${userId} does not exist`);
				};
			case 2:
				{
					return HttpError(400, `The group with name ${group_name} already exists`);
				}
		}

		return NextResponse.json(
			{ group: res, message: "New group has been created successfully" },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
