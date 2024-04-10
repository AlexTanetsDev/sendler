import db from "@/db";
import { fetchUserDeliveredSms, fetchUserPaidSms, fetchUserPendingSms, fetchUserAdjusmentSms } from ".";

export default async function updateUserBalance(id: number | undefined): Promise<number | undefined | null> {
	if (id) { return null; }
	let balance: number;
	let paidSms: number | null;
	let deliveredSms: number | null;
	let pendingSms: number | null;
	let adjusmentSms: number | null;

	if (id) {
		paidSms = await fetchUserPaidSms(id);
		deliveredSms = await fetchUserDeliveredSms(id);
		pendingSms = await fetchUserPendingSms(id);
		adjusmentSms = await fetchUserAdjusmentSms(id);
		if (paidSms === null) {
			paidSms = 0;
		};
		if (deliveredSms === null) {
			deliveredSms = 0;
		};
		if (pendingSms === null) {
			pendingSms = 0;
		}
		if (adjusmentSms === null) {
			adjusmentSms = 0;
		}
		balance = paidSms - deliveredSms - pendingSms - adjusmentSms;
		await db.query(`UPDATE users SET balance = ${balance} where user_id = ${id}`);
		return balance;
	};
};