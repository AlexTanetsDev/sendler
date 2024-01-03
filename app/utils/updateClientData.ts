// import db from "@/db";

// import { QueryResult } from "pg";
// import { IClientDatabase } from "@/globaltypes/types";

// export default async function updateClientData(first_name: string | undefined, middle_name: string | undefined, last_name: string | undefined, date_of_birth: Date | undefined, parameter_1: string | undefined, parameter_2: string | undefined, tel: number, clientId: number) {

// 	const res: QueryResult<IClientDatabase> = await db.query(
// 		"UPDATE clients SET first_name = $1, middle_name = $2, last_name = $3, date_of_birth = $4, parameter_1=$5, parameter_2=$6, tel=$7  WHERE client_id = $8 RETURNING *",
// 		[first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2, tel, clientId]
// 	);

// 	return res;
// };

import db from "@/db";

import { QueryResult } from "pg";
import { IClient, IClientDatabase } from "@/globaltypes/types";

export default async function updateClientData(id: number, client: IClient) {
	const { tel, first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2 } = client;

	const res: QueryResult<IClientDatabase> = await db.query(
		"UPDATE clients SET first_name = $1, middle_name = $2, last_name = $3, date_of_birth = $4, parameter_1=$5, parameter_2=$6, tel=$7  WHERE client_id = $8 RETURNING *",
		[first_name, middle_name, last_name, date_of_birth, parameter_1, parameter_2, tel, id]
	);

	return res;
};