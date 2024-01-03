import {
	insertNewClient,
	deleteGroupData
} from ".";

import { IClient } from "@/globaltypes/types";

export default async function insertNewClientInGroup(client: IClient, user_id: number, group_id: number, method: string): Promise<void> {

	try {
		await insertNewClient(client, user_id);
	} catch (error: any) {
		if (method === 'POST') { await deleteGroupData(group_id); }
		throw new Error(error.message);
	}

}