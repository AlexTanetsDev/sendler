import db from "@/db";
import axios, { AxiosResponse } from "axios";
import resellerAuth from "../api/reseller/helpers/resellerAuth";
import smsStatDecoder from "../api/reseller/helpers/smsStatusDecoder";

import { IRecipientStatusDatabase, IStatusSmsRes } from "@/globaltypes/types";
import { QueryResult } from "pg";

interface ResultObject {
	client_id: number;
	identificator: string;
	recipient_status: string;
};

interface IClientSmsStat extends Partial<ResultObject> {
	status: string;
};

export const updateSmsStatusesByHistoryId = async (history_id: number): Promise<IRecipientStatusDatabase[] | null> => {
	const smsIdentificators: QueryResult<ResultObject> = await db.query(
		`SELECT client_id, identificator, recipient_status FROM recipients_status WHERE history_id = $1 AND recipient_status != 'fullfield'`,
		[history_id]
	);

	const finalyArr = await Promise.all(
		smsIdentificators.rows.map(async (client: ResultObject) => {
			const stat = await getSmsStatus(client.identificator);
			return { client_id: client.client_id, status: stat, identificator: client.identificator };
		})
	);

	if (finalyArr.length > 0) {
		const smsStatUpdateQString = smsStatusUpdateQueryCreator(finalyArr);
		const statusResult = await updateResipientsStatusDb(smsStatUpdateQString, history_id);
		return statusResult.rows;
	}
	return null;
};

const getSmsStatus = async (identificator: string) => {
	const authRes = await resellerAuth();
	if (!authRes) throw new Error("Authorisation error");
	const result = await axios.get<IStatusSmsRes, AxiosResponse<IStatusSmsRes>>(
		`https://api.streamtools.com.ua/rest/Sms/State?sessionId=${authRes}&messageId=${identificator}`
	);
	const status = smsStatDecoder(result.data.State);
	if (status === "pending") return "pending";
	if (status === "rejected") return "rejected";
	return "fullfield";
};

const smsStatusUpdateQueryCreator = (clientsSmsStatuses: IClientSmsStat[]) => {
	const query = clientsSmsStatuses
		.map((sms) => {
			return `when ${sms.client_id} then '${sms.status}'`;
		})
		.join(" ");
	return query;
};

const updateResipientsStatusDb = (query: string, history_id: number): Promise<QueryResult<IRecipientStatusDatabase>> => {
	return db.query(
		`UPDATE recipients_status SET
        recipient_status =
        case client_id
          ${query}
          else recipient_status
        end
    WHERE history_id = ${history_id}
    RETURNING *`
	);
};
