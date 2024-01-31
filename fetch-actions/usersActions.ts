import { axiosInstance } from '@/helpers/AxiosInstance';

const api = axiosInstance;

export async function getUser(userId: number | undefined) {
	try {
		const res = await api.get(`/api/users/${userId}`);
		return res;
	} catch (error: any) { };
};

export async function updateUser(
	userId: number | undefined,
	login: string,
	password: string,
	newPassword: string,
	userName: string,
	phone: number,
	email: string) {
	try {
		const res = await api.put(`api/users/${userId}`,
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
