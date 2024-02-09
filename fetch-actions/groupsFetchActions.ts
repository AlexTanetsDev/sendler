import { axiosInstance } from '@/helpers/AxiosInstance';
import { AxiosResponse } from 'axios';

import { IGetUserGroups } from './types';

const api = axiosInstance;

export async function getUserGroups(userId: number) {
	try {
		if (userId) {
			const res = await api.get<IGetUserGroups, AxiosResponse<IGetUserGroups>, {
				userId: number
			}>
				(`api/sending-groups`, {
					params: {
						userId: userId,
					},
				});
			return res.data.groups;
		}
	} catch (error: any) { };
};