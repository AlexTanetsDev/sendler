import axios from "axios";
import { AxiosResponse } from "axios";

const { RESELLER_URL, RESELLER_LOGIN, RESELLER_PASSWORD } = process.env;

export default async function resellerAuth(): Promise<string | undefined> {
	const res = await axios.get<string, AxiosResponse<string>>(
		`${RESELLER_URL}/rest/user/sessionid?login=${RESELLER_LOGIN}&password=${RESELLER_PASSWORD}`
	);
	return res.data;
};
