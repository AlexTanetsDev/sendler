import db from '@/db';

import { QueryResult } from 'pg';
import { IPaymentHistory } from '@/globaltypes/types';

export default async function fetchUserPaymentHistory(
	id: number
): Promise<QueryResult<IPaymentHistory>> {
	const res: QueryResult<IPaymentHistory> = await db.query(
		`SELECT transaction_id, user_id, sms_count, money_count, to_char(transactions_date, 'DD.MM.YYYY HH24:MI:SS') AS transactions_date, paid, paymant_date
		FROM transactions_history WHERE user_id = $1`,
		[id]
	);
	return res;
};
