import db from "@/db";
import { IClientId } from "@/globaltypes/types";

export default async function deleteClientData(id: IClientId): Promise<void> {
	await db.query(
		`DELETE FROM clients
		WHERE clients.client_id = ${id}`
	);
};