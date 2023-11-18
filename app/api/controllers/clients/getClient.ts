import { QueryResult } from "pg";
import {
	fetchClientData,
	fetchAllClientId
} from "@/app/utils";

import {
	IClientId,
	IClientDatabase,
} from "@/globaltypes/types";

export default async function getClient(id: number): Promise<IClientDatabase | null> {
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
		const client: QueryResult<IClientDatabase> = await fetchClientData(id);

		return client.rows[0];

	} catch (error: any) {
		throw new Error(error.message);
	}
}