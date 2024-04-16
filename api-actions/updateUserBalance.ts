import db from "@/db";

import { QueryResult } from "pg";
import {
	fetchUserDeliveredSms,
	fetchUserPaidSms,
	fetchUserPendingSms,
	fetchUserAdjusmentSms
} from ".";
import {
	IResPaidSms,
	IResDeliveredSms,
	IResPendingSms,
	IResAjustmentSms
} from "@/globaltypes/types";

export default async function updateUserBalance(id: number | undefined): Promise<number | undefined | null> {
	try {
		if (id === null || id === undefined) { return null; }
		else {
			let balance: number;
			let paidSms: number;
			let deliveredSms: number;
			let pendingSms: number;
			let adjusmentSms: number;

			const resPaidSms: QueryResult<IResPaidSms> = await fetchUserPaidSms(id);
			paidSms = Number(resPaidSms.rows[0].paid_sms);

			const resDeliveredSms: QueryResult<IResDeliveredSms> = await fetchUserDeliveredSms(id);
			deliveredSms = Number(resDeliveredSms.rows[0].delevered_sms);

			const resPendigSms: QueryResult<IResPendingSms> = await fetchUserPendingSms(id);
			pendingSms = Number(resPendigSms.rows[0].pending_sms);

			const resAjustmentSms: QueryResult<IResAjustmentSms> = await fetchUserAdjusmentSms(id);
			adjusmentSms = Number(resAjustmentSms.rows[0].sum);

			balance = paidSms - deliveredSms - pendingSms - adjusmentSms;
			await db.query(`UPDATE users SET balance = ${balance} WHERE user_id = ${id} RETURNING *`);
			return balance;
		};
	} catch (error: any) {
		throw new Error(error.message);
	};
};