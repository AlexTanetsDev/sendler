import axios, { AxiosError } from "axios";

const { RESELLER_URL, RESELLER_LOGIN, RESELLER_PASSWORD } = process.env;

export default async function resellerAuth() {
  try {
    const res = await axios.get(
      `${RESELLER_URL}/rest/user/sessionid?login=${RESELLER_LOGIN}&password=${RESELLER_PASSWORD}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
