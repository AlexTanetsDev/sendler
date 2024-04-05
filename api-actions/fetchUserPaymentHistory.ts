import db from '@/db';

import { QueryResult } from 'pg';
import { IPaymentHistory } from '@/globaltypes/types';

export default async function fetchUserPaymentHistory(
	id: number
): Promise<IPaymentHistory[]> {
	const res: QueryResult<IPaymentHistory> = await db.query(
		`SELECT * FROM transactions_history WHERE user_id = $1`,
		[id]
	);
	return res.rows;
};
