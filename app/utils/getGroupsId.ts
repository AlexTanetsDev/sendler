import db from "@/db";

import {
	IGroupId,
	QueryResult,
} from "@/globaltypes/types";

export default async function getGroupsId(): Promise<QueryResult<IGroupId>> {
	const res = await db.query(`SELECT group_id FROM send_groups`);
	return res;
};