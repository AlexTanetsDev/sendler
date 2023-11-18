import { NextRequest, NextResponse } from "next/server";

import getUserGroups from '@/app/api/controllers/sending-groups/getUserGroups';
import createGroup from '@/app/api/controllers/sending-groups/createGroup';


import HttpError from '@/helpers/HttpError';

import { IQieryParamsCreateGroup } from "./types";
import {
	IGroupDatabase,
	ErrorCase
} from "@/globaltypes/types";

import {
	schemaReqCreateGroup
} from "@/models/sending-groups";


// get all groups for one user by user ID
export async function GET(request: NextRequest): Promise<NextResponse<{
	error: string;
}> | NextResponse<{
	groups: IGroupDatabase[];
	message: string;
}> | NextResponse<{
	message: string;
	error: any;
}>> {

	const { searchParams }: URL = new URL(request.url);
	const userId = Number(searchParams.get("userId"));

	//checking user_id existense
	if (userId) {
		try {
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
		} catch (error: any) {
			return NextResponse.json(
				{ message: "Failed to get a list of group.", error: error.message },
				{ status: 500, }
			);
		}
	}

	return HttpError(400, `No userId`);
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

		const { groupName, clients } = value;
		const { searchParams }: URL = new URL(request.url);
		const userId = Number(searchParams.get("userId"));
		const method = request.method;

		if (!groupName) {
			return HttpError(400, `The input does not contain the group name.`);
		}

		if (clients.length === 0) {
			return HttpError(400, `The clients list is empty`);
		}

		const res: IGroupDatabase | ErrorCase | NextResponse<{
			error: string;
		}> = await createGroup(groupName, clients, userId, method);

		switch (res) {
			case 1:
				{
					return HttpError(400, `The user with id = ${userId} does not exist`);
				};
			case 2:
				{
					return HttpError(400, `The group with name ${groupName} already exists`);
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
