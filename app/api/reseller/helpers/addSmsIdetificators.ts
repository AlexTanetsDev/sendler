import db from "@/db";
import { IClientDatabaseWithGroupId, ISmsIdentificatorsDatabase } from "@/globaltypes/types";
import { QueryResult } from "pg";

export const addSmsIdentificators = async (
	history_id: number,
	clients: Partial<IClientDatabaseWithGroupId>[],
	identificators: string[]): Promise<ISmsIdentificatorsDatabase[]> => {
	const factor = identificators.length / clients.length;
	let counter = 0;
	let interval = 1;
	const query = identificators.map((identificator) => {
		const str = `(${history_id}, ${clients[counter].client_id},${clients[counter].group_id}, 'pending', '${identificator}')`;
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
		`INSERT INTO recipients_status (history_id, client_id, group_id, recipient_status, identificator) VALUES ${query} RETURNING *`
	);

	return res.rows;
};
