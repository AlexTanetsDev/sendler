import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/helpers/AxiosInstance';
import {
	IGetUser,
	IUpdateUser
} from './types';

const api = axiosInstance;

export async function getUser(userId: number | undefined) {
	try {
		const res = await api.get<IGetUser, AxiosResponse<IGetUser>>(`/api/users/${userId}`);
		return res;
	} catch (error: any) { };
};

export async function updateUser(
	userId: number | undefined,
	login: string,
	password: string,
	newPassword: string,
	userName: string,
	phone: string,
	email: string) {
	try {
		const res = await api.put<IUpdateUser, AxiosResponse<IUpdateUser>, {
			userLogin: string,
			password: string,
			newPassword: string,
			userName: string,
			tel: string,
			email: string
		}>
			(`api/users/${userId}`,
				{
					userLogin: login,
					password: password,
					newPassword: newPassword,
					userName: userName,
					tel: phone,
					email: email,
				}
			);
		return res;
	} catch (error: any) { };
};
