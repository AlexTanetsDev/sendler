import axios from "axios";
import toast from "react-hot-toast";

import { IClientDatabase } from "@/globaltypes/types";

export async function getGroupClientsAndGroupName(
	groupId: number,
	filter: string,
	limit: number | null,
	visible: number) {
	try {
		if (groupId) {
			const res = await axios.get(`api/sending-groups/${groupId}`, {
				params: {
					filter: filter,
					limit: limit,
					visible: visible,
				},
			});
			return res.data.res;
		}
	} catch (error: any) {
		toast.error(error.message + ' | ' + error.response.data.error, {
			position: 'bottom-center',
			className: 'toast_error',
			style: {
				backgroundColor: '#0F3952',
				color: '#fa9c9c',
				fontSize: '24px',
				marginBottom: '20%',
			},
		});
		console.log(error.message);
	}
};

export async function getUserClients(
	userId: number | null,
	filter: string,
	limit: number | null,
	visible: number) {
	try {
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
	} catch (error: any) {
		toast.error(error.message + " | " + error.response.data.error,
			{
				position: 'bottom-center',
				className: 'toast_error',
				style: {
					backgroundColor: '#0F3952',
					color: "#fa9c9c",
					fontSize: '24px',
					marginBottom: '20%'
				}
			});
		console.log(error.message + " | " + error.response.data.error);
	}
};

export async function deleteGroupClients(groupId: number | undefined, clientsId: number[]) {
	if (groupId && clientsId.length > 0) {
		try {
			const res = await axios.patch(`api/sending-groups/${groupId}`, {
				clients: clientsId,
			});
			toast.success(res.data.message, {
				duration: 3000,
				position: 'bottom-center',
				className: 'toast_success',
				style: {
					backgroundColor: '#0F3952',
					color: "lightgreen",
					fontSize: '24px',
					borderColor: 'green',
					marginBottom: '20%'
				}
			})
		} catch (error: any) {
			toast.error(error.message + " | " + error.response.data.error,
				{
					position: 'bottom-center',
					className: 'toast_error',
					style: {
						backgroundColor: '#0F3952',
						color: "#fa9c9c",
						fontSize: '24px',
						marginBottom: '20%'
					}
				});
		}
	}
};

export async function deleteClients(clientsId: number[]) {
	if (clientsId.length > 0) {
		clientsId.forEach(async clientId => {
			try {
				await axios.delete(`api/clients/${clientId}`);
			} catch (error: any) {
				toast.error(error.message + " | " + error.response.data.error,
					{
						position: 'bottom-center',
						className: 'toast_error',
						style: {
							backgroundColor: '#0F3952',
							color: "#fa9c9c",
							fontSize: '24px',
							marginBottom: '20%'
						}
					});
			}
		});
	}
};
