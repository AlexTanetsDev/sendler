import { QueryResult } from "pg";
import {
	IClientId,
	IClientDatabase,
} from "@/globaltypes/types";
import {
	fetchClientData,
	fetchAllClientsId
} from "@/api-actions";

export default async function getClient(id: number): Promise<IClientDatabase | null> {
	try {
		const clientsIdRes: QueryResult<IClientId> = await fetchAllClientsId();
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