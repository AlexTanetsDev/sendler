import { NextResponse, NextRequest } from "next/server";

import HttpError from "@/helpers/HttpError";

import {
	getGroupClients,
	deleteGroup,
	updateGroup
} from '@/app/api/controllers/sending-groups';

import { IClient } from "@/globaltypes/types";
import { IQieryParamsUpdateGroup } from "./types";

import { schemaReqUpdateGroup } from '@/models/sending-groups';

// get one group with id from params
export async function GET(_request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: string; }> | NextResponse<{ group: string, clients: IClient[] | NextResponse<{ error: string; }> }>> {

	const groupId = Number(params.id);

	try {
		const res: { group: string, clients: IClient[] } | NextResponse<{ message: string; }> | null = await getGroupClients(groupId);

		if (res === null) {
			return HttpError(400, `The group with id = ${groupId} does not exist`);
		}

		return NextResponse.json(
			{ res, message: 'Group memebers' },
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
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: string; }>> {
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: any; }> | NextResponse<string>> {

	try {
		const body: IQieryParamsUpdateGroup = await request.json();
		const { error, value } = schemaReqUpdateGroup.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		}

		const { clients } = value;

		const groupId = Number(params.id);
		const method: string = request.method;


		const resUpdate: null | NextResponse<{
			error: string;
		}> | undefined = await updateGroup(clients, groupId, method);

		if (resUpdate === null) {
			return HttpError(400, `The group with id = ${groupId} does not exist`);
		}

		if (clients.length === 0) {
			return NextResponse.json(
				{ message: `The group is empty` },
				{ status: 200 }
			);
		}

		const resGet: { group: string, clients: IClient[] } | NextResponse<{ message: string; }> | null = await getGroupClients(groupId);

		return NextResponse.json(
			{ resGet, message: `The group is updated` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });

	}
}
