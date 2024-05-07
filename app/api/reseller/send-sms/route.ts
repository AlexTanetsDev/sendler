import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import resellerAuth from "../helpers/resellerAuth";
import { createSmsUrlStr } from "../helpers/createSmsQueryString";
import { addSendingHistory } from "../helpers/addSendingHistory";
import { addSmsIdentificators } from "../helpers/addSmsIdetificators";
import { smsSender } from "../helpers/smsSender";
import { schemaSendSMS } from "@/models/send-sms";
import {
	deleteHistoryId,
	fetchGroupClients,
	fetchHistoryId,
	updateUserBalance,
	correctUserBalance,
	fetchGroupIdByName,
	fetchUser
} from "@/api-actions";
import { createGroup } from "../../controllers/sending-groups";
import { createClient } from "../../controllers/clients";
import { updateSmsStatusesByHistoryId } from "@/app/utils/updateSmsStatusesByHistoryId";

import { QueryResult } from "pg";
import { SmsStatusEnum } from "@/globaltypes/types";
import {
	IClientDatabase,
	IClientDatabaseWithGroupId,
	ISendSMS,
	ISession,
	IGroupId,
	IUser
} from "@/globaltypes/types";

export async function POST(request: Request): Promise<NextResponse<{
	message: string;
}> | NextResponse<{
	error: string;
}>> {
	const session: ISession | null = await getServerSession(options);
	const userId = session?.user.user_id;
	if (!userId) {
		return NextResponse.json(
			{ message: "The userId doesn't exist." },
			{ status: 400 }
		);
	};
	const res: IUser | null = await fetchUser(String(userId));
	let balance: number | undefined;

	if (res === null) {
		return NextResponse.json(
			{ message: "Can not get user." },
			{ status: 500 }
		);
	} else {
		balance = res?.balance;
	};
	try {
		const body: ISendSMS = await request.json();
		const { error, value } = schemaSendSMS.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.details[0].message },
				{ status: 400 }
			);
		};

		const { userName, recipients, date, time, contentSMS, send_method } = value;
		const dateString = date + ' ' + time;
		let diff = 0;
		let diffSecond = 0;

		if (!(dateString === ' ')) {
			const now = new Date();
			const dateSending = new Date(dateString);
			diff = dateSending.getTime() - now.getTime();
			diffSecond = Math.round(diff / 1000);
		};

		if (diff < 0) {
			return NextResponse.json(
				{ message: "Your date or time is rong." },
				{ status: 400 }
			);
		};

		if (!userName) {
			return NextResponse.json(
				{ message: "Enter user name, please." },
				{ status: 400 }
			);
		};

		if (!(recipients.length > 0)) {
			return NextResponse.json(
				{ message: "Enter recipients, please." },
				{ status: 400 }
			);
		};

		if (!contentSMS) {
			return NextResponse.json(
				{ message: "Enter text sms, please." },
				{ status: 400 }
			);
		};

		const authRes = await resellerAuth();
		if (!authRes) throw new Error("Authorisation error");

		const clients: IClientDatabaseWithGroupId[] = [];
		const groupIdArray: number[] = [];

		const updateSmsStatusesInRealTime = async (i: number) => {
			if (i <= 0) {
				return 0;
			};
			let statuses: SmsStatusEnum[] = [];

			setTimeout(async () => {
				const res = await updateSmsStatusesByHistoryId(history_id);
				if (res === null) { return 0 };
				await updateUserBalance(userId);
				res.map(item => {
					statuses.push(item.recipient_status);
				});
				return await updateSmsStatusesInRealTime(i - 60000);
			}, 60000);
		};

		for (let i = 0; i < recipients.length; i++) {
			if (typeof recipients[i] === "number") {
				const currentDate = new Date().toLocaleString('en');
				if (userId) {
					const group_name = `${recipients[i]} ${currentDate}`.split(" ").join("_").replace(",", "");
					await createGroup(group_name, userId, true);
					const res: QueryResult<IGroupId> = await fetchGroupIdByName(userId, group_name);
					const { group_id } = res.rows[0];
					await createClient({ tel: String(recipients[i]) }, userId, group_id);
					const resClientGroup: QueryResult<IClientDatabase> = await fetchGroupClients(group_id, null, 0, '');
					if (resClientGroup.rows.length > 0) {
						const clientWithGroupId: IClientDatabaseWithGroupId = resClientGroup.rows[0];
						clientWithGroupId.group_id = group_id;
						clients.push(clientWithGroupId);
					};
					groupIdArray.push(group_id);
				};
			}
			if (typeof recipients[i] === "string") {
				const res: QueryResult<IGroupId> = await fetchGroupIdByName(userId, String(recipients[i]));
				const { group_id } = res.rows[0];
				const resClientsGroup: QueryResult<IClientDatabase> = await fetchGroupClients(group_id, null, 0, '');
				if (resClientsGroup.rows.length > 0) {
					const clientsWithGroupId: IClientDatabaseWithGroupId[] = resClientsGroup.rows;
					clientsWithGroupId.forEach(client => {
						client.group_id = group_id;
						clients.push(client);
					});
				};
				groupIdArray.push(group_id);
			};
		};

		let clientsInBalance: IClientDatabaseWithGroupId[];
		if (balance && clients.length > balance) {
			clientsInBalance = clients.slice(0, balance);
		} else {
			clientsInBalance = clients;
		};

		let res;
		if (diff > 0) {
			res = await addSendingHistory(groupIdArray, contentSMS, send_method, userName, diffSecond);
		} else {
			res = await addSendingHistory(groupIdArray, contentSMS, send_method, userName);
		};

		const { history_id } = res;

		const sendSmsAgrigatorFunctions = async () => {
			const { sending_permission } = await fetchHistoryId(history_id);
			if (sending_permission) {
				const smsQuerystr = createSmsUrlStr(clientsInBalance, contentSMS);
				const identificators = await smsSender(authRes, smsQuerystr, clientsInBalance.length, userName);
				await addSmsIdentificators(history_id, clientsInBalance, identificators);
				await correctUserBalance(userId, (-clientsInBalance.length));
				await updateSmsStatusesInRealTime(21600000);
				return;
			};
			await deleteHistoryId(history_id);
			return;
		};

		if (diff > 0) {
			setTimeout(sendSmsAgrigatorFunctions, diff);
			return NextResponse.json({ message: `SMS messages will be sent ${date} at ${time}.` });
		} else {
			await sendSmsAgrigatorFunctions();
		};

		return NextResponse.json({ message: "SMS messages have been sent successfully." });
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to send SMS masseges.", error: error.message },
			{ status: 500, }
		);
	}
};
