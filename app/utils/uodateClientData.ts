import db from "@/db";

import { IClient } from "@/globaltypes/types";

export default async function updateClientData(id: number, client: IClient): Promise<void> {
	await db.query(
		`UPDATE clients
		SET tel = client.tel, user_id = client.user_id, first_name = client.first_name, middle_name = client.middle_name, last_name = client.last_name, date_of_birth = client.date_of_birth, parameter_1 = client.parameter_1, parameter_2 = client.parameter_2
		WHERE clients.client_id = ${id}`
	);
};