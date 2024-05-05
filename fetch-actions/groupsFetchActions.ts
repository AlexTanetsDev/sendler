import { axiosInstance } from '@/helpers/AxiosInstance';
import { AxiosResponse } from 'axios';

import { IGetUserGroups } from './types';
import { IClientDatabase, IGroupDatabase } from '@/globaltypes/types';

const api = axiosInstance;

export async function getUserGroups(userId: number) {
	try {
		const res = await api.get<IGetUserGroups, AxiosResponse<IGetUserGroups>, {
			userId: number
		}>
			(`api/sending-groups`, {
				params: {
					userId: userId,
				},
			});
		return res.data.groups;
	} catch (error: any) { };
};

export async function deleteGroup(id: number) {
	try {
		await api.delete<void, AxiosResponse<void>>(`api/sending-groups/${id}`);
	} catch (error: any) { }
};

export async function createGroup(groupName: string, userId: number | undefined) {
	try {
		await api.post<IGroupDatabase, AxiosResponse<IGroupDatabase>, {
			group_name: string
		}>
			(`api/sending-groups`,
				{
					group_name: groupName,
				},
				{
					params: {
						userId: userId,
					},
				}
			);
	} catch (error: any) { };
};

export async function getGroupById(id: number) {
	try {
		const res = await api.get<{
			res: {
				groupName: string;
				clients: IClientDatabase[];
			}
		}, AxiosResponse<{
			res: {
				groupName: string;
				clients: IClientDatabase[];
			}
		}, {
			params: {
				userId: null,
				filter: '',
				limit: null,
				visible: 0,
			}
		}>>(`api/sending-groups/${id}`, {
			params: {
				userId: null,
				filter: '',
				limit: null,
				visible: 0,
			},
		});
		return res;
	} catch (error) { };
};