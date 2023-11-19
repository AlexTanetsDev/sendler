import { NextResponse } from "next/server";

import HttpError from "@/helpers/HttpError";

import {
	updateClient,
	deleteClient,
} from "../../controllers/clients";

import {
	IClientDatabase
} from "@/globaltypes/types";
import { IQieryParamsUpdateClient } from "./types";

import { schemaReqClient } from '@/models/clients';
import getClient from "../../controllers/clients/getClient";

//get one client by id
export async function GET(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{
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

// delete one group with id from params
export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{ message: string; }> | NextResponse<{ error: string; }>> {
	const clientId = Number(params.id);

	try {
		const res: NextResponse<{
			error: string;
		}> | null | undefined = await deleteClient(clientId);

		if (res === null) {
			return HttpError(400, `The client with id = ${clientId} does not exist`);
		}
		return NextResponse.json(
			{ message: `Client with id = ${clientId} is deleted` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to delete a client", error: error.message },
			{ status: 500 }
		);
	}
}

export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{
	client: IClientDatabase;
	message: string;
}> | NextResponse<{
	error: any;
}>> {

	try {

		const body: IQieryParamsUpdateClient = await request.json();


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
			return HttpError(400, `The clients list is empty`);
		}

		const clientId = Number(params.id);
		const res = await updateClient(client, clientId);

		if (res === null) {
			return HttpError(400, `The client with id = ${clientId} does not exist`);
		}
		return NextResponse.json(
			{ client: res, message: `The client is updated` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
