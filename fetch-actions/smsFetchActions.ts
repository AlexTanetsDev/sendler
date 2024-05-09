import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/helpers/AxiosInstance';

import { ISendSMS, IClientDatabase, IClientArray } from '@/globaltypes/types';

const api = axiosInstance;

export async function sendSMS(
	userName: string,
	recipients: (string | number)[],
	contentSMS: string,
	date: string | null = '',
	time: string | undefined = '',
	send_method: 'api' | 'web' = 'web',
) {
	try {
		const res = await api.post<string, AxiosResponse<string>, {
			userName: string,
			recipients: (string | number)[],
			date: string | null,
			time: string | undefined,
			contentSMS: string,
			send_method: 'api' | 'web',
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

export async function getSendSmsClients(recipients: (string | number)[]) {
	try {
		const res = await api.post<IClientArray, AxiosResponse<IClientArray>, {
			recipients: (string | number)[],
		}>
			(`/api/reseller/get-recipients`,
				{
					recipients,
				});
		return res.data.clients;
	} catch (error: any) { };
};


