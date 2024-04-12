import db from "@/db";
import HttpError from '@/helpers/HttpError';
import { NextResponse } from "next/server";
import {
	fetchUserAdjusmentSms,
	fetchUserDeliveredSms,
	fetchUserPaidSms,
	fetchUserPaymentHistory,
	fetchUserPendingSms,
	fetchUserSentSms,
	updateUserBalance
} from ".";
import { QueryResult } from "pg";
import {
	IUser,
	IResAjustmentSms,
	IResPaidSms,
	IPaymentHistory,
	IResDeliveredSms,
	IResSentdSms,
	IResPendingdSms
} from "@/globaltypes/types";

export default async function fetchUser(id: string): Promise<IUser | null> {
	try {
		if (!id) {
			return null;
		};
		await updateUserBalance(Number(id));
		const res: QueryResult<IUser> = await db.query(
			`SELECT balance, email, user_active, user_create_date, user_id, user_login, user_name, user_role, tel
  	FROM users
		WHERE user_id = ${id}`
		);

		const resAlfaNames: QueryResult<{ alfa_name: string, alfa_name_active: boolean }> = await db.query(`SELECT alfa_name, alfa_name_active
	FROM sendler_name
	WHERE user_id = ${id}`
		);

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
		const deliveredSms: QueryResult<IResDeliveredSms> = await fetchUserDeliveredSms(Number(id));
		user.delivered_sms = Number(deliveredSms.rows[0].delevered_sms);

		const sentSms: QueryResult<IResSentdSms> = await fetchUserSentSms(Number(id));
		user.sent_sms = Number(sentSms?.rows[0].sent_sms);

		const pendingSms: QueryResult<IResPendingdSms> = await fetchUserPendingSms(Number(id));
		user.pending_sms = Number(pendingSms?.rows[0].pending_sms);

		const paidSms: QueryResult<IResPaidSms> = await fetchUserPaidSms(Number(id));
		user.paid_sms = Number(paidSms?.rows[0].paid_sms);

		const adjusmentSms: QueryResult<IResAjustmentSms> = await fetchUserAdjusmentSms(Number(id));
		user.adjusment_sms = Number(adjusmentSms?.rows[0].sum);

		let paymentHistory: QueryResult<IPaymentHistory> = await fetchUserPaymentHistory(Number(id));
		user.paymentHistory = paymentHistory.rows;

		user.alfa_names_active = alfaNamesActive;
		user.alfa_names_disable = alfaNamesDisable;

		return user;
	} catch (error: any) {
		throw new Error(error.message);
	};
};