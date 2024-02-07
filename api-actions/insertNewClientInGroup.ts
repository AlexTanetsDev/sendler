import {
	insertNewClient,
	deleteGroupData
} from "@/api-actions";

import { IClient } from "@/globaltypes/types";

export default async function insertNewClientInGroup(client: IClient, user_id: number, group_id: number, method: string): Promise<IClient> {
	try {
		const res = await insertNewClient(client, user_id);
		return res;
	} catch (error: any) {
		if (method === 'POST') { await deleteGroupData(group_id); }
		throw new Error(error.message);
	}

}