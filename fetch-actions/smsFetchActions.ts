import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/helpers/AxiosInstance';

const api = axiosInstance;

export async function sendSMS(
	userName: string,
	recipients: (string | number)[],
	contentSMS: string,
	date: string | undefined = '',
	time: string | undefined = '',
	send_method: string
) {
	try {
		const res = await api.post<string, AxiosResponse<string>, {
			userName: string,
			recipients: (string | number)[],
			date: string | undefined,
			time: string | undefined,
			contentSMS: string,
			send_method: string
		}>
			(`/api/reseller/send-sms`,
				{
					userName,
					recipients,
					date,
					time,
					contentSMS,
					send_method
				});
		return res;
	} catch (error: any) { };
};

