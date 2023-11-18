import { NextResponse } from "next/server";

import {
	deleteClientData,
	fetchAllClientId
} from "@/app/utils";

import { IClientId } from "@/globaltypes/types";

export default async function deleteClient(id: number): Promise<NextResponse<{
	error: string;
}> | undefined | null> {
	try {
		const clientsIdRes = await fetchAllClientId();
		const clientsIdInDatabase = clientsIdRes.rows;

		if (
			!clientsIdInDatabase.find(
				(clientsIdInDatabase: IClientId) => clientsIdInDatabase.client_id === id
			)
		) {
			return null;
		}
		await deleteClientData(id);

	} catch (error: any) {
		throw new Error(error.message);
	}
}