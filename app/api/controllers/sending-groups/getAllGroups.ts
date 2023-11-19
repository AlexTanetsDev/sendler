import { fetchAllGroups } from "@/app/utils";

import { QueryResult } from "pg";
import { IGroupDatabase } from "@/globaltypes/types";

// get all groups for one user by user ID
export default async function getAllGroups(): Promise<IGroupDatabase[]> {
	try {
		const groups: QueryResult<IGroupDatabase> = await fetchAllGroups();

		return groups.rows;
	} catch (error: any) {
		throw new Error(error.message);
	}
}