import { NextResponse } from "next/server";

import { QueryResult } from "pg";
import { IClientId } from "@/globaltypes/types";
import {
	deleteClientData,
	fetchAllClientsId
} from "@/api-actions";

export default async function deleteClient(id: number): Promise<NextResponse<{
	error: string;
}> | undefined | null> {
	try {
		const clientsIdRes: QueryResult<IClientId> = await fetchAllClientsId();
		const clientsIdInDatabase = clientsIdRes.rows;

		if (
			!clientsIdInDatabase.find(
				(clientsIdInDatabase: IClientId) => clientsIdInDatabase.client_id === id
			)
		) {
			return null;
		};
		await deleteClientData(id);

	} catch (error: any) {
		throw new Error(error.message);
	};
};