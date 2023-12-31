import {
	fetchClientData,
	updateClientData
} from "@/app/utils";

import { QueryResult } from "pg";
import {
	IClient,
	IClientDatabase,
} from "@/globaltypes/types";

export default async function updateClient(client: IClient, clientId: number): Promise<null | IClientDatabase> {

	let {
		tel,
		first_name,
		middle_name,
		last_name,
		date_of_birth,
		parameter_1,
		parameter_2 } = client;

	try {
		//checking client existense
		const clientRes: QueryResult<IClientDatabase> = await fetchClientData(clientId);

		const clientInDatabase = clientRes.rows[0];


		if (!clientInDatabase) {
			return null;
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

		const clientDataRes: QueryResult<IClientDatabase> = await updateClientData(first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2, tel, clientId);

		return clientDataRes.rows[0];

	} catch (error: any) {
		throw new Error(error.message);
	}

}