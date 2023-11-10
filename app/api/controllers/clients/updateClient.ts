import db from "@/db";


import { IClientId, QueryResult, IClient, ErrorCase, IUserСlient, IClientDatabase } from "@/globaltypes/types";

export default async function updateClient(client: IClient, clientId: number): Promise<IUserСlient | ErrorCase> {
	let {
		tel,
		first_name,
		middle_name,
		last_name,
		date_of_birth,
		parameter_1,
		parameter_2 } = client;

	try {
		//checking the content of the entered client
		if (!tel) {
			return 1;
		}

		//checking client existense
		const clientRes: QueryResult<IClientDatabase> = await db.query(`SELECT client_id, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2 FROM clients WHERE  client_id=${clientId}`);

		const clientInDatabase = clientRes.rows[0];

		if (!clientInDatabase) {
			return 2;
		}

		//check optional parameters
		if (!first_name) {
			first_name = clientInDatabase.first_name;
		};

		if (!middle_name) {
			middle_name = clientInDatabase.middle_name;
		};

		if (!last_name) {
			last_name = clientInDatabase.last_name;
		};

		if (!date_of_birth) {
			date_of_birth = clientInDatabase.date_of_birth;
		};

		if (!parameter_1) {
			parameter_1 = clientInDatabase.parameter_1;
		};

		if (!parameter_2) {
			parameter_2 = clientInDatabase.parameter_2;
		};

		const clientDataRes: QueryResult<IUserСlient> = await db.query(
			"UPDATE clients SET first_name = $1, middle_name = $2, last_name = $3, date_of_birth = $4, parameter_1=$5, parameter_2=$6, tel=$7  WHERE client_id = $8 RETURNING *",
			[first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2, tel, clientId]
		);
		return clientDataRes.rows[0];

	} catch (error: any) {
		throw new Error(error.message);
	}

}