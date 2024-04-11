import db from "@/db";
import { fetchUserDeliveredSms, fetchUserPaidSms, fetchUserPendingSms, fetchUserAdjusmentSms } from ".";

export default async function updateUserBalance(id: number | undefined): Promise<number | undefined | null> {
	try {
		if (id === null || id === undefined) { return null; }
		else {
			let balance: number;
			let paidSms: number | null | undefined;
			let deliveredSms: number | null | undefined;
			let pendingSms: number | null | undefined;
			let adjusmentSms: number | null | undefined;
			paidSms = await fetchUserPaidSms(id);
			deliveredSms = await fetchUserDeliveredSms(id);
			pendingSms = await fetchUserPendingSms(id);
			adjusmentSms = await fetchUserAdjusmentSms(id);
			if (paidSms === null || paidSms === undefined) {
				paidSms = 0;
			};
			if (deliveredSms === null || deliveredSms === undefined) {
				deliveredSms = 0;
			};
			if (pendingSms === null || pendingSms === undefined) {
				pendingSms = 0;
			}
			if (adjusmentSms === null || adjusmentSms === undefined) {
				adjusmentSms = 0;
			}
			balance = paidSms - deliveredSms - pendingSms - adjusmentSms;
			const res = await db.query(`UPDATE users SET balance = ${balance} where user_id = ${id} RETURNING *`);
			return balance;
		};
	} catch (error: any) {
		return error;
	};
};