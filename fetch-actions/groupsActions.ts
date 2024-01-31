import { axiosInstance } from '@/helpers/AxiosInstance'

const api = axiosInstance;

export async function getGroups(userId: number) {
	try {
		if (userId) {
			const res = await api.get(`api/sending-groups`, {
				params: {
					userId: userId,
				},
			});
			return res.data.groups;
		}
	} catch (error: any) { };
};