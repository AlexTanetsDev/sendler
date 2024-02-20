import { IClientDatabase } from "@/globaltypes/types";

export const createSmsUrlStr = (clients: (IClientDatabase)[], text: string, userName: string): string => {
	const adaptedText = text.split(" ").join("+");
	const distination =
		clients.length > 1 ? "DestinationAddresses" : "DestinationAddress";

	const str = clients
		.map((client) => {
			return `${distination}=${client.tel}&Data=${adaptedText.replace('%UserName%', userName).replace('+%Param__1%', client.parameter_1 ? `${'+' + client.parameter_1}` : '').replace('+%Param__2%', client.parameter_2 ? `${'+' + client.parameter_2}` : '')}&`;
		})
		.join("");
	return str.slice(0, str.length - 1);
};
