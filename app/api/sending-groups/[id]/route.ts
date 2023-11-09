import { NextResponse } from "next/server";

import HttpError from "@/helpers/HttpError";

import getGroup from '@/app/api/controllers/sending-groups/getGroup';
import deleteGroup from "@/app/api/controllers/sending-groups/deleteGroup";
import updateGroup from "@/app/api/controllers/sending-groups/updateGroup";

import {
	IClient,
	ErrorCase
} from "@/globaltypes/types";
import { IQieryParamsUpdateGroup } from "./types";

// get one group with id from params
export async function GET(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: string; }> | NextResponse<{ clients: IClient[] | NextResponse<{ error: string; }> }>> {

	const groupId = Number(params.id);

	try {
		const res: IClient[] | NextResponse<{
			message: string;
		}> | null = await getGroup(groupId);

		if (res === null) {
			return HttpError(400, `The group with id = ${groupId} does not exist`);
		}
		return NextResponse.json(
			{ clients: res, message: 'Group memebers' },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to get a groups list", error: error.message },
			{ status: 500 }
		);
	}
}

// delete one group with id from params
export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: string; }>> {
	const groupId = Number(params.id);

	try {
		const res: NextResponse<{
			error: string;
		}> | null | undefined = await deleteGroup(groupId);

		if (res === null) {
			return HttpError(400, `The group with id = ${groupId} does not exist`);
		}
		return NextResponse.json(
			{ message: `Group with id = ${groupId} is deleted` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to delete a group", error: error.message },
			{ status: 500 }
		);
	}
}

//update one group with id from params
export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: any; }> | NextResponse<string>> {
	const { clients }: IQieryParamsUpdateGroup = await request.json();
	const groupId = Number(params.id);
	const method: string = request.method;

	try {
		const res: ErrorCase | NextResponse<{
			error: string;
		}> | undefined = await updateGroup(clients, groupId, method);

		switch (res) {
			case 1:
				{
					return HttpError(400, `The clients list is empty`);
				};
			case 2:
				{
					return HttpError(400, `The group with id = ${groupId} does not exist`);
				};
		}

		return NextResponse.json(
			{ message: `The group is updated` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });

	}
}
