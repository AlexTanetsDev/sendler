import db from "@/db";

import { fetchUserBalance } from ".";

export default async function correctUserBalance(id: number, quantity: number): Promise<number | null> {
	const balance = await fetchUserBalance(id);
	if (!balance) {
		return null;
	};
	await db.query(`UPDATE users SET balance = ${balance + quantity} where user_id = ${id}`);
	const res = await fetchUserBalance(id);
	return res;
};