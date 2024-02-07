import { QueryResult } from "pg";
import {
	IUserId,
	IClientDatabase,
} from "@/globaltypes/types";
import {
	fetchUserClients,
	fetchUsersId
} from "@/api-actions";

// get all groups for one user by user ID
export default async function getUserClients(userId: number, filter: string, limit: number | null, visible: number): Promise<IClientDatabase[] | null> {
	try {
		const usersIdRes: QueryResult<IUserId> = await fetchUsersId();
		const usersIdInDatabase = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return null;
		};

		const clients: QueryResult<IClientDatabase> = await fetchUserClients(userId, filter, limit, visible);

		return clients.rows;
	} catch (error: any) {
		throw new Error(error.message);
	}
}