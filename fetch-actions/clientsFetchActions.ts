import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/helpers/AxiosInstance';

import {
	IClientData,
	IClientDatabase
} from "@/globaltypes/types";
import {
	IGetGroupClientsAndGroupName,
	IGetUserClients,
	IDeleteGroupClients,
	IUpdateUserClient,
	ICreateGroupClient
} from './types';

const api = axiosInstance;

export async function getGroupClientsAndGroupName(
	groupId: number,
	filter: string,
	limit: number | null,
	visible: number) {
	try {
		if (groupId) {
			const res = await api.get<IGetGroupClientsAndGroupName, AxiosResponse<IGetGroupClientsAndGroupName>, {
				filter: string,
				limit: number,
				visible: number
			}>
				(`api/sending-groups/${groupId}`, {
					params: {
						filter: filter,
						limit: limit,
						visible: visible,
					},
				});
			return res.data.res;
		}
	} catch (error: any) { };
};

export async function getUserClients(
	userId: number | null,
	filter: string,
	limit: number | null,
	visible: number) {
	try {
		const res = await api.get<IGetUserClients, AxiosResponse<IGetUserClients>, {
			userId: number | null,
			filter: string,
			limit: number | null,
			visible: number
		}>
			(`api/clients`, {
				params: {
					userId: userId,
					filter: filter,
					limit: limit,
					visible: visible
				},
			});
		const clients = res.data.clients;
		return clients as IClientDatabase[];
	} catch (error: any) { };
};

export async function deleteGroupClients(groupId: number | undefined, clientsId: number[]) {
	if (groupId && clientsId.length > 0) {
		try {
			await api.patch<IDeleteGroupClients, AxiosResponse<IDeleteGroupClients>, {
				clients: number[]
			}>
				(`api/sending-groups/${groupId}`, {
					clients: clientsId,
				});
		} catch (error: any) { };
	}
};

export async function deleteClients(clientsId: number[]) {
	if (clientsId.length > 0) {
		try {
			await api.delete<void, AxiosResponse<void>>
				(`api/clients/`,
					{
						data: { clientsId: clientsId, }
					});
		} catch (error: any) { };
	}
};

export async function updateUserClient(id: number | undefined, clientData: IClientData) {
	try {
		const res = await api.put<IUpdateUserClient, AxiosResponse<IUpdateUserClient>, {
			client: IClientData
		}>
			(`api/clients/${id}`,
				{
					client: clientData,
				},
			);
		return res;
	} catch (error: any) { };

};

export async function createGroupClient(userId: number | undefined, groupId: number | undefined, clientData: IClientData) {
	try {
		const res = await api.post<ICreateGroupClient, AxiosResponse<ICreateGroupClient>, {
			userId: number | undefined,
			groupId: number,
			client: IClientData
		}>
			(`api/clients`,
				{
					userId: userId,
					groupId: Number(groupId),
					client: clientData
				},
			);
		return res;
	} catch (error: any) { };
};
