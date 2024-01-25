import axios from "axios";
import { toast } from "react-toastify";

import { IClientDatabase } from "@/globaltypes/types";

export default async function getClients(
	userId: number | null,
	filter: string,
	limit: number | null,
	visible: number,
	groupId?: number | null) {
	try {
		if (groupId) {
			const response = await axios.get(`api/sending-groups/${groupId}`, {
				params: {
					userId: userId,
					filter: filter,
					limit: limit,
					visible: visible
				}
			});
			return response.data.res;
		} else {
			const res = await axios.get(`api/clients`, {
				params: {
					userId: userId,
					filter: filter,
					limit: limit,
					visible: visible
				},
			});
			const clients = res.data.clients;
			return clients as IClientDatabase[];
		};
	} catch (error: any) {
		toast.error(error.message + " | " + error.response.data.message,
			{
				position: 'top-center',
				style: {
					width: '380px',
					height: '220px',
					fontSize: '24px',
				},
				theme: 'colored'
			});
		console.log(error.message + " | " + error.response.data.message);
	}
};
