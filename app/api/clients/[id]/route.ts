import { NextResponse } from "next/server";

import HttpError from "@/helpers/HttpError";

import { updateClient } from "../../controllers/clients";

import {
	ErrorCase,
	IClientDatabase
} from "@/globaltypes/types";
import { IQieryParamsUpdateClient } from "./types";

export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{
	res: IClientDatabase | ErrorCase;
	message: string;
}> | NextResponse<{
	error: any;
}>> {
	const { client }: IQieryParamsUpdateClient = await request.json();
	const clientId = Number(params.id);

	try {
		const res = await updateClient(client, clientId);

		switch (res) {
			case 1:
				{
					return HttpError(400, `The client is empty`);
				};
			case 2:
				{
					return HttpError(400, `The group with id = ${clientId} does not exist`);
				};
		}

		return NextResponse.json(
			{ res, message: `The client is updated` },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });

	}
}
