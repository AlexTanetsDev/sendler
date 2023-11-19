
import { NextResponse } from "next/server";

import {
	getAllGroups,
	getUserGroups,
	createGroup
} from "../../controllers/sending-groups";

import HttpError from '@/helpers/HttpError';

import { IQieryParamsCreateGroup } from "./types";
import {
	IGroupDatabase,
	ErrorCase,
} from "@/globaltypes/types";

import {
	schemaReqCreateGroup
} from "@/models/sending-groups";

// get all groups for all users
// or
// get all groups for one user by user ID
export async function GET(request: Request): Promise<NextResponse<{
	error: string;
}> | NextResponse<{
	groups: IGroupDatabase[];
}> | NextResponse<{
	message: string;
}>> {

	try {

		const { searchParams } = new URL(request.url);
		const userId = Number(searchParams.get("userId"));

		if (userId) {

			const res: null | IGroupDatabase[] = await getUserGroups(userId);

			if (res === null) {
				return HttpError(400, `The user with id = ${userId} does not exist.`);
			}

			if (res === undefined) {
				return HttpError(400, `The user with id = ${userId} have not any groups.`);
			}

			return NextResponse.json(
				{ groups: res, message: 'Get a groups.' },
				{ status: 200 }
			);
		}
		const res: IGroupDatabase[] = await getAllGroups();
		return NextResponse.json(
			{ groups: res },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to get a list of group" },
			{ status: 500, }
		);
	}
}

// add new sendig group, here we working with excel file of clients and get user ID from search params
// 1. we adding all clients to clients table and getting all clients id in array
// 2. create sending group with user_id from search params and array of clients
export async function POST(request: Request): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: any; }> | NextResponse<string>> {

	try {

		const body: IQieryParamsCreateGroup = await request.json();
		const { error, value } = schemaReqCreateGroup.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		}

		const { group_name, clients } = value;
		const { searchParams }: URL = new URL(request.url);
		const userId = Number(searchParams.get("userId"));
		const method = request.method;

		if (!group_name) {
			return HttpError(400, `The input does not contain the group name.`);
		}

		if (clients.length === 0) {
			return HttpError(400, `The clients list is empty`);
		}

		const res: IGroupDatabase | ErrorCase | NextResponse<{
			error: string;
		}> = await createGroup(group_name, clients, userId, method);

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
			{ group: res, message: "New group created successfully" },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
