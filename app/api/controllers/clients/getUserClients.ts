import {
	fetchUserClients,
	fetchUsersId
} from "@/app/utils";

import { QueryResult } from "pg";
import {
	IUserId,
	IClient,
} from "@/globaltypes/types";

// get all groups for one user by user ID
export default async function getUserClients(userId: number, filter: string, limit: number | null, visible: number): Promise<IClient[] | null> {
	try {
		const usersIdRes: QueryResult<IUserId> = await fetchUsersId();
		const usersIdInDatabase = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return null;
		};

		const clients: QueryResult<IClient> = await fetchUserClients(userId, filter, limit, visible);

		return clients.rows;
	} catch (error: any) {
		throw new Error(error.message);
	}
}