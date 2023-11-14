import db from "@/db";

import {
	fetchUserGroupsName,
	fetchUsersId
} from "@/app/utils";

import { QueryResult } from "pg";
import {
	IUserId,
	IGroupName
} from "@/globaltypes/types";

// get all groups for one user by user ID
export default async function getUserGroups(userId: number): Promise<IGroupName | null> {
	try {
		const usersIdRes: QueryResult<IUserId> = await fetchUsersId();
		const usersIdInDatabase = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return null;
		};

		const groups: QueryResult<IGroupName> = await fetchUserGroupsName(userId);

		return groups.rows[0];
	} catch (error: any) {
		throw new Error(error.message);
	}
}





