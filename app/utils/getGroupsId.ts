import db from "@/db";

import { QueryResult } from "pg";
import { IGroupId } from "@/globaltypes/types";

export default async function getGroupsId(): Promise<QueryResult<IGroupId>> {
	const res = await db.query(`SELECT group_id FROM send_groups`);
	return res;
};