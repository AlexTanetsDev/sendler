import db from "@/db";
import { fetchUserAdjusmentSms, fetchUserDeliveredSms, fetchUserPaymentHistory, fetchUserSentSms, updateUserBalance } from ".";
import { QueryResult } from "pg";
import { IUser } from "@/globaltypes/types";

export default async function fetchUser(id: string): Promise<IUser | null> {

	// await updateUserBalance(Number(id));
	const res: QueryResult<IUser> = await db.query(
		`SELECT balance, email, user_active, user_create_date, user_id, user_login, user_name, user_role, tel
  	FROM users
		WHERE user_id = ${id}`
	);

	if (!res) {
		return null;
	};

	const resAlfaNames: QueryResult<{ alfa_name: string, alfa_name_active: boolean }> = await db.query(`SELECT alfa_name, alfa_name_active
	FROM sendler_name
	WHERE user_id = ${id}`
	);

	if (!resAlfaNames) {
		return null;
	};

	const alfaNamesActive: string[] = [];
	const alfaNamesDisable: string[] = [];

	for (const resAlfaName of resAlfaNames.rows) {
		if (resAlfaName.alfa_name_active) {
			alfaNamesActive.push(resAlfaName.alfa_name)
		} else {
			alfaNamesDisable.push(resAlfaName.alfa_name)
		}
	};

	const user = res.rows[0];
	const deliveredSms = await fetchUserDeliveredSms(Number(id));
	if (!deliveredSms) {
		user.delivered_sms = 0;
	} else {
		user.delivered_sms = deliveredSms;
	};
	const sentSms = await fetchUserSentSms(Number(id));
	if (!sentSms) {
		user.sent_sms = 0;
	} else {
		user.sent_sms = sentSms;
	};
	const adjusmentSms = await fetchUserAdjusmentSms(Number(id));
	if (adjusmentSms && user.balance) {
		user.balance = user.balance - adjusmentSms;
	};
	let paymentHistory = await fetchUserPaymentHistory(Number(id));
	if (!paymentHistory) {
		paymentHistory = [];
	};

	user.alfa_names_active = alfaNamesActive;
	user.alfa_names_disable = alfaNamesDisable;
	user.paymentHistory = paymentHistory;
	return user;
};