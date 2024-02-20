import db from "@/db";
import { IClientDatabase, ISmsIdentificatorsDatabase } from "@/globaltypes/types";
import { QueryResult } from "pg";

export const addSmsIdentificators = async (
	history_id: number,
	clients: Partial<IClientDatabase>[],
	identificators: string[]): Promise<ISmsIdentificatorsDatabase[]> => {
	const factor = identificators.length / clients.length;
	let counter = 0;
	let interval = 1;
	const query = identificators.map((identificator) => {
		const str = `(${history_id}, ${clients[counter].client_id}, '${identificator}')`;
		if (interval === factor) {
			counter += 1;
			interval = 1;
		} else {
			interval += 1;
		}
		return str;
	})
		.join(",");

	const res: QueryResult<ISmsIdentificatorsDatabase> = await db.query(
		`INSERT INTO sms_identificators (history_id, client_id, identificator) VALUES ${query} RETURNING *`
	);

	return res.rows;
};
