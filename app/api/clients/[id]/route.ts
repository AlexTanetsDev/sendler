import { NextResponse } from "next/server";

import HttpError from "@/helpers/HttpError";

import { updateClient } from "../../controllers/clients";

import {
	IClient,
	IClientDatabase
} from "@/globaltypes/types";
import { IQieryParamsUpdateClient } from "./types";

import { schemaReqUpdateClient } from '@/models/sending-groups';

export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{
	res: IClientDatabase | null;
	message: string;
}> | NextResponse<{
	error: any;
}>> {

	try {

		const body: IQieryParamsUpdateClient = await request.json();


		const { error, value } = schemaReqUpdateClient.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		}

		const { client } = value;

		// const { client }: IQieryParamsUpdateClient = await request.json();

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
			{ res, message: `The client is updated` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });

	}
}
