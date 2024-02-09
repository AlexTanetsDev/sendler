import { NextResponse, NextRequest } from "next/server";

import HttpError from "@/helpers/HttpError";

import {
	getGroupClients,
	deleteGroup,
	updateGroup,
	editGroup,
} from '@/app/api/controllers/sending-groups';


import { IClientDatabase } from "@/globaltypes/types";
import { IQieryParamsUpdateGroup } from "./types";

import { schemaReqUpdateGroup, schemaReqEditGroup } from '@/models/sending-groups';

// get one group with id from params
export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{
	error: string;
}> | NextResponse<{
	res: {
		groupName: string;
		clients: IClientDatabase[];
	};
}> | NextResponse<{
	message: string;
	error: any;
}>> {

	const { searchParams }: URL = new URL(request.url);
	const groupId = Number(params.id);
	const filter = String(searchParams.get("filter"));
	const visible = Number(searchParams.get("visible"));
	const limit = searchParams.get("limit") === null ? null : Number(searchParams.get("limit"));

	try {
		const res: { groupName: string, clients: IClientDatabase[] } | NextResponse<{ message: string; }> | null = await getGroupClients(groupId, limit, visible, filter);
		if (res === null) {
			return HttpError(400, `The group with id = ${groupId} does not exist`);
		}

		return NextResponse.json(
			{ res },
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
			{ message: `Group has been  deleted` },
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{
	message: string;
}> | NextResponse<{
	error: any;
}>> {

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

		if (clients.length === 0) {
			return NextResponse.json(
				{ message: `The group is empty` },
				{ status: 200 }
			);
		};

		const groupId = Number(params.id);
		const method: string = request.method;

		const resUpdate: null | NextResponse<{
			error: string;
		}> | undefined = await updateGroup(clients, groupId, method);

		if (resUpdate === null) {
			return HttpError(400, `The group with id = ${groupId} does not exist`);
		}

		return NextResponse.json(
			{ message: `The group has been updated` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	};
};

//edit one group with id from params
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{
	message: string;
}> | NextResponse<{
	error: any;
}>> {

	try {
		const body: IQieryParamsUpdateGroup = await request.json();
		const { error, value } = schemaReqEditGroup.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		}

		const { clients } = value;

		if (clients.length === 0) {
			return NextResponse.json(
				{ message: `The group is empty` },
				{ status: 200 }
			);
		}

		const groupId = Number(params.id);
		const method: string = request.method;


		const resUpdate: null | NextResponse<{
			error: string;
		}> | undefined = await editGroup(clients, groupId, method);

		if (resUpdate === null) {
			return HttpError(400, `The group with id = ${groupId} does not exist`);
		}

		return NextResponse.json(
			{ message: `Clients have been deleted` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });

	}
}

