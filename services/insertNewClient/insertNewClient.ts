import db from "@/db";
import { IUserСlient } from "@/globaltypes/types";

export default async function insertNewClient(client: IUserСlient, user_id: number, group_id: number, method: string) {

	const { tel, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2 } = client;
	try {
		await db.query(
			`INSERT INTO clients (tel, user_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
			[tel, user_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2]
		);
	} catch (error: any) {
		if (method === 'POST') { await db.query(`DELETE FROM send_groups	WHERE send_groups.group_id = ${group_id}`); }
		throw new Error(error.message);
	}
}