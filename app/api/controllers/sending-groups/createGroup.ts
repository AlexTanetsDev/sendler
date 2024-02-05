import { QueryResult } from "pg";
import {
	IUserId,
	IGroupDatabase,
	IGroupName,
	ErrorCase
} from "@/globaltypes/types";
import {
	insertNewGroup,
	fetchUsersId,
	fetchUserGroupsName,
} from "@/api-actions";


export default async function createGroup(groupName: string, userId: number, method: string): Promise<IGroupDatabase | ErrorCase> {

	try {
		//checking user_id existense
		const usersIdRes: QueryResult<IUserId> = await fetchUsersId();
		const usersIdInDatabase: IUserId[] = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return 1;
		}

		//checking same group_name existense for user
		const groupsNameRes: QueryResult<IGroupName> = await fetchUserGroupsName(userId);
		const groupsNameInDatabase: IGroupName[] = groupsNameRes.rows;

		if (
			groupsNameInDatabase.find(
				(groupNameInDatabase: IGroupName) => groupNameInDatabase.group_name === groupName
			)
		) {
			return 2;
		};

		const group: QueryResult<IGroupDatabase> = await insertNewGroup(groupName, userId);

		return group.rows[0];
	} catch (error: any) {
		throw new Error(error.message);
	}
}