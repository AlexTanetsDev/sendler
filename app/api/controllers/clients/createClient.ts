import { QueryResult } from "pg";
import {
	IUserId,
	ITelRes,
	IClient,
	ErrorCase,
} from "@/globaltypes/types";
import {
	fetchUserClientsTel,
	fetchUsersId,
	insertNewClient,
	insertGroupMember
} from "@/api-actions";

export default async function createClient(client: IClient, userId: number, groupId: number): Promise<ErrorCase | undefined> {
	try {
		const { tel } = client;

		//checking user_id existense
		const usersIdRes: QueryResult<IUserId> = await fetchUsersId();
		const usersIdInDatabase: IUserId[] = usersIdRes.rows;

		if (!usersIdInDatabase.find((userIdInDatabase: IUserId) => userIdInDatabase.user_id === userId)) {
			return 1;
		}

		//checking same tel existense for user
		const userClientsTelResData: QueryResult<ITelRes> = await fetchUserClientsTel(userId);

		//checking whether a client exists in the user's client list
		//and adding client
		const userClientsTelInDtabase = userClientsTelResData.rows;

		if (userClientsTelInDtabase.find((userClientTelInDtabase: ITelRes) => userClientTelInDtabase.tel === String(tel))) {
			return 2;
		}

		await insertNewClient(client, userId);
		await insertGroupMember(client.tel, userId, groupId);

	} catch (error: any) {
		throw new Error(error.message);
	}
}