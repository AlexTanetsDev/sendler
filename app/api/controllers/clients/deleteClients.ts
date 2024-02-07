
import deleteClient from "./deleteClient";

export default async function deleteClients(clientsId: number[]): Promise<number[]> {
	try {
		const clientsNotDeleted: number[] = [];
		clientsId.forEach(async clientId => {
			const res = await deleteClient(clientId);
			if (res === null) {
				clientsNotDeleted.push(clientId);
			}
		});
		return clientsNotDeleted;
	} catch (error: any) {
		throw new Error(error.message);
	};
};