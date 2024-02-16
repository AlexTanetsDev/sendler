import { IClientDatabase } from "@/globaltypes/types";

export const createSmsUrlStr = (clients: (string | IClientDatabase)[], text: string, userName: string): string => {
	const adaptedText = text.split(" ").join("+");
	const distination =
		clients.length === 1 && (typeof clients[0] === 'string') ? "DestinationAddress" : "DestinationAddresses";

	const str = clients
		.map((client) => {
			if (typeof client === 'string') {
				return `${distination}=${client}&Data=${adaptedText.replace('%UserName%', userName).replace('+%Param1%', '').replace('+%Param2%', '')}&`;
			}
			return `${distination}=${client.tel}&Data=${adaptedText.replace('%UserName%', userName).replace('%Param1%', `${client.parameter_1}`).replace('%Param2%', `${client.parameter_1}`)}&`;
		})
		.join("");
	return str.slice(0, str.length - 1);
};
