import { NextResponse, NextRequest } from "next/server";

import HttpError from "@/helpers/HttpError";

import {
	deleteClient,
	getClient,
} from "@/app/api/controllers/clients";

import {
	IClient,
	IClientDatabase,
} from "@/globaltypes/types";

import {
	IQieryParamsClient
} from "./types";

import {
	schemaReqClient,
} from '@/models/clients';
import { updateClientData } from "@/api-actions";

import { QueryResult } from "pg";

//get one client with id from params
export async function GET(_request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{
	error: string;
}> | NextResponse<{
	client: IClientDatabase;
	message: string;
}> | NextResponse<{
	message: string;
	error: any;
}>> {
	try {
		const clientId = Number(params.id);

		const res: IClientDatabase | NextResponse<{
			message: string;
		}> | null = await getClient(clientId);

		if (res === null) {
			return HttpError(400, `The client with id = ${clientId} does not exist`);
		}
		return NextResponse.json(
			{ client: res, message: 'Please, client' },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to get a client", error: error.message },
			{ status: 500 }
		);
	}
}

// delete one client with id from params
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{
	error: string;
}> | NextResponse<{
	status: number;
}> | NextResponse<{
	message: string;
	error: any;
}>> {
	const clientId = Number(params.id);

	try {
		const res: NextResponse<{
			error: string;
		}> | null | undefined = await deleteClient(clientId);

		if (res === null) {
			return HttpError(400, `The client with id = ${clientId} does not exist`);
		}
		return NextResponse.json(
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to delete a client", error: error.message },
			{ status: 500 }
		);
	}
}

//update one client with id from params
export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<{
	client: IClient;
	message: string;
}> | NextResponse<{
	error: any;
}>> {

	try {
		const body: IQieryParamsClient = await request.json();
		const { error, value } = schemaReqClient.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		}

		const { client } = value;

		//checking the content of the entered client
		if (!client.tel) {
			return HttpError(400, `The client is empty`);
		}

		const clientId = Number(params.id);

		const res: QueryResult<IClient> = await updateClientData(client, clientId);


		if (res === null) {
			return HttpError(400, `The client with id = ${clientId} does not exist`);
		}
		return NextResponse.json(
			{ client: res.rows[0], message: `The client has been updated` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
