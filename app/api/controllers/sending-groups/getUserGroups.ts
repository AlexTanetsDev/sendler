import db from "@/db";

import { IUserId, IGroupName, QueryResult } from "@/globaltypes/types";

// get all groups for one user by user ID
export default async function getUserGroups(userId: number): Promise<IGroupName | null> {
	try {
		const usersIdRes: QueryResult<IUserId> = await db.query(`SELECT user_id FROM users`);
		const usersIdInDatabase = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return null;
		};


		const groups: QueryResult<IGroupName> = await db.query(
			`SELECT group_name FROM send_groups WHERE user_id = ${userId}`
		);

		return groups.rows[0];
	} catch (error: any) {
		throw new Error(error.message);
	}
}





