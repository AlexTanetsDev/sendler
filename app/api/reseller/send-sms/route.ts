import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";


import resellerAuth from "../helpers/resellerAuth";
import { getClientsTelByGroupId } from "../helpers/getClientsTelByGroupId";
import { createSmsUrlStr } from "../helpers/createSmsQueryString";
import { addSendingHistory } from "../helpers/addSendingHistory";
import { addSmsIdentificators } from "../helpers/addSmsIdetificators";
import { addSmsStatus } from "../helpers/addSmsStatus";
import { smsSender } from "../helpers/smsSender";
import { schemaSendSMS } from "@/models/send-sms";
import { IClientDatabase, ISendSMS, ISession } from "@/globaltypes/types";
import fetchGroupIdByName from "@/api-actions/fetchGroupIdByName";
import { fetchGroupClients } from "@/api-actions";

export async function POST(request: Request) {
	const session: ISession | null = await getServerSession(options);
	const userId = session?.user.user_id;
	try {
		const body: ISendSMS = await request.json();

		const { error, value } = schemaSendSMS.validate(body);

		if (error) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 }
			);
		};

		const { userName, recipients, date, time, contentSMS } = value;

		if (!userName) {
			return NextResponse.json(
				{ message: "Enter user name, piease." },
				{ status: 400 }
			);
		};

		if (!recipients) {
			return NextResponse.json(
				{ message: "Enter recipients, piease." },
				{ status: 400 }
			);
		};

		if (!contentSMS) {
			return NextResponse.json(
				{ message: "Enter text sms, piease." },
				{ status: 400 }
			);
		};

		const authRes = await resellerAuth();
		if (!authRes) throw new Error("Authorisation error");

		const clients: (IClientDatabase | string)[] = [];

		for (let i = 0; i < recipients.length; i++) {
			if (typeof recipients[i] === "number") {
				clients.push(String(recipients[i]));
			}
			if (typeof recipients[i] === "string") {
				const res = await fetchGroupIdByName(userId, String(recipients[i]));
				const { group_id } = res.rows[0];
				const resClientsGroup = await fetchGroupClients(group_id, null, 0, '');
				if (resClientsGroup.rows.length > 0) {
					resClientsGroup.rows.forEach(client => {
						clients.push(client);
					});
				};
			};
		};

		const smsQuerystr = createSmsUrlStr(clients, contentSMS, userName);

		// console.log(smsQuerystr);

		const identificators = await smsSender(authRes, smsQuerystr, clients.length);
		console.log('identificators', identificators);

		// const historyId = await addSendingHistory(group_id);

		// const setSmsIdentificatorsRes = await addSmsIdentificators(
		// 	historyId,
		// 	clients,
		// 	identificators
		// );

		// const statusRes = await addSmsStatus(historyId, clients, "pending");

		return NextResponse.json({ message: "SMS messages have been sent successfully." });
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to send SMS masseges.", error: error.message },
			{ status: 500, }
		);
	}

}

// const statuses = await updateSmsStatus(historyId);
// console.log("statuses :", statuses);
