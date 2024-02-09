import {
	NextRequest,
	NextResponse
} from "next/server";

import {
	createClient,
	getUserClients
} from '@/app/api/controllers/clients';

import HttpError from '@/helpers/HttpError';

import { IQieryParamsCreateClient, IQieryParamsDeleteClients } from "./types";
import {
	ITel,
	ErrorCase,
	IClientDatabase
} from "@/globaltypes/types";

import { schemaReqAddClient, schemaReqDeleteClients } from "@/models/clients";
import deleteClients from "../controllers/clients/deleteClients";


// get all clients for one user with user_id from search params
export async function GET(request: NextRequest): Promise<NextResponse<{
	error: string;
}> | NextResponse<{
	clients: IClientDatabase[];
}> | NextResponse<{
	message: string;
	error: any;
}>> {

	const { searchParams }: URL = new URL(request.url);
	const userId = Number(searchParams.get("userId"));
	const filter = String(searchParams.get("filter"));
	const visible = Number(searchParams.get("visible"));
	const limit = searchParams.get("limit") === null ? null : Number(searchParams.get("limit"));

	//checking user_id existense
	if (userId) {
		try {
			const res: null | IClientDatabase[] = await getUserClients(userId, filter, limit, visible);

			if (res === null) {
				return HttpError(400, `The user with id = ${userId} does not exist.`);
			}

			if (res === undefined) {
				return HttpError(400, `The user with id = ${userId} have not any clients.`);
			}

			return NextResponse.json(
				{ clients: res },
				{ status: 200 }
			);
		} catch (error: any) {
			return NextResponse.json(
				{ message: "Failed to get a list of clients.", error: error.message },
				{ status: 500, }
			);
		}
	}
	return HttpError(400, `No userId`);
}

// create client for user with user_id from search params
export async function POST(request: NextRequest): Promise<NextResponse<{
	message: string;
}> | NextResponse<{
	error: any;
}>> {

	try {
		const body: IQieryParamsCreateClient = await request.json();
		const { error, value } = schemaReqAddClient.validate(body);
		const { client, groupId, userId } = value;

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		};

		if (!client) {
			return HttpError(400, `The client is empty`);
		};

		const res: ErrorCase | undefined = await createClient(client, userId, groupId);
		const { tel }: ITel = client;

		switch (res) {
			case 1:
				{
					return HttpError(400, `The user with id = ${userId} does not exist`);
				};
			case 2:
				{
					return HttpError(400, `The client with tel: ${tel} already exists`);
				}
		};
		return NextResponse.json(
			{ message: "New client has been created successfully" },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};



export async function DELETE(request: NextRequest) {
	try {
		const body: IQieryParamsDeleteClients = await request.json();
		const { error, value } = schemaReqDeleteClients.validate(body);
		const { clientsId } = value;

		const res = await deleteClients(clientsId);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		};

		if (res.length > 0) {
			return HttpError(400, `The clients with id = ${res} don't exist`);
		};

		return NextResponse.json(
			{ message: "Clients have been deleted." },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

