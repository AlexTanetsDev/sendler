import { fetchAllClients } from "@/app/utils";

import { QueryResult } from "pg";
import {
	IClientId,
	IClient
} from "@/globaltypes/types";

// get all groups for one user by user ID
export default async function getAllClients(): Promise<(IClientId | IClient)[]> {
	try {

		const clients: QueryResult<IClientId | IClient> = await fetchAllClients();

		return clients.rows;
	} catch (error: any) {
		throw new Error(error.message);
	}
}