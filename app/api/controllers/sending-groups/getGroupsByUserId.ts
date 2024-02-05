import { QueryResult } from "pg";
import {
	IUserId,
	IGroupDatabase,
} from "@/globaltypes/types";
import {
	fetchUserGroups,
	fetchUsersId
} from "@/api-actions";

// get all groups for one user by user ID
export default async function getGroupsByUserId(userId: number): Promise<IGroupDatabase[] | null> {

	try {
		const usersIdRes: QueryResult<IUserId> = await fetchUsersId();
		const usersIdInDatabase = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return null;
		};

		const groups: QueryResult<IGroupDatabase> = await fetchUserGroups(userId);

		return groups.rows;
	} catch (error: any) {
		throw new Error(error.message);
	}
}





