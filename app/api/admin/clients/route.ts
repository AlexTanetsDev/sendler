import {
	NextRequest,
	NextResponse
} from "next/server";

import {
	createClient,
	getUserClients,
	getAllClients
} from '@/app/api/controllers/clients';

import HttpError from '@/helpers/HttpError';

import { IQieryParamsCreateClient } from "./types";
import {
	ITel,
	ErrorCase,
	IClient
} from "@/globaltypes/types";

import { schemaReqClient } from "@/models/clients";

// get all clints for all users
// or
// get all clients for one user by user ID
export async function GET(request: NextRequest) {

	const { searchParams }: URL = new URL(request.url);
	const userId = Number(searchParams.get("userId"));

	//checking user_id existense
	try {
		if (userId) {
			const res: null | IClient[] = await getUserClients(userId);

			if (res === null) {
				return HttpError(400, `The user with id = ${userId} does not exist.`);
			}

			if (res === undefined) {
				return HttpError(400, `The user with id = ${userId} have not any clients.`);
			}

			return NextResponse.json(
				{ clients: res, message: 'Get a clients.' },
				{ status: 200 }
			);
		}
		const res = await getAllClients();
		return NextResponse.json(
			{ clients: res },
			{ status: 200 })
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to get a list of clients.", error: error.message },
			{ status: 500, }
		);
	}
}


// create client with user_id from search params
export async function POST(request: NextRequest) {

	try {
		const body: IQieryParamsCreateClient = await request.json();
		const { error, value } = schemaReqClient.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		}

		const { client } = value;
		const { searchParams }: URL = new URL(request.url);
		const userId = Number(searchParams.get("userId"));

		if (!client) {
			return HttpError(400, `The client is empty`);
		}

		const res: ErrorCase | undefined = await createClient(client, userId);
		const { tel } = client;

		switch (res) {
			case 1:
				{
					return HttpError(400, `The user with id = ${userId} does not exist`);
				};
			case 2:
				{
					return HttpError(400, `The client with tel ${tel} already exists`);
				}
		}

		return NextResponse.json(
			{ message: "New client created successfully" },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
