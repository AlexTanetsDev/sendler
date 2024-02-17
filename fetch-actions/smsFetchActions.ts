import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/helpers/AxiosInstance';

const api = axiosInstance;

export async function sendSMS(
	userName: string,
	recipients: (string | number)[],
	contentSMS: string,
	date: string | undefined = '',
	time: string | undefined = '',
) {
	try {
		const res = await api.post<string, AxiosResponse<string>, {
			userName: string,
			recipients: (string | number)[],
			date: string | undefined,
			time: string | undefined,
			contentSMS: string
		}>
			(`/api/reseller/send-sms`,
				{
					userName,
					recipients,
					date,
					time,
					contentSMS
				});
		return res;
	} catch (error: any) { };
};

