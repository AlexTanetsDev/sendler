import db from "@/db";
import { fetchUserDeliveredSms, fetchUserPaidSms } from ".";

export default async function updateUserBalanceInRealTime(id: number | undefined, history_id: number, quantity: number): Promise<number | undefined> {
	let paidSms;
	let deliveredSms;
	let balance;
	if (id) {
		paidSms = await fetchUserPaidSms(id);
		deliveredSms = await fetchUserDeliveredSms(id);
		if (paidSms === null || paidSms === undefined) {
			paidSms = 0;
		};
		if (deliveredSms === null || deliveredSms === undefined) {
			deliveredSms = 0;
		};
		balance = paidSms - deliveredSms;
		await db.query(`UPDATE users SET balance = ${balance} where user_id = ${id}`);
	};
	return balance;
};