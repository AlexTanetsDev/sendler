import axios, { AxiosError } from "axios";
import { AxiosResponse } from "axios";

const { RESELLER_URL, RESELLER_LOGIN, RESELLER_PASSWORD } = process.env;

export default async function getBalance(code: string | undefined): Promise<number | undefined> {
	const res = await axios.get<number, AxiosResponse<number>>(
		`${RESELLER_URL}/rest/user/Balance?SessionID=${code}`
	);
	return res.data;
};
