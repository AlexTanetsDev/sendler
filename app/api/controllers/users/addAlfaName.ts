import { fetchUser } from "@/api-actions";
import insertAlfaName from "@/api-actions/insertAlfaName";


export default async function addAlfaName(alfa_name: string, user_id: number) {
	const user = await fetchUser(String(user_id));
	if (
		user?.alfa_names_active.find((name) => name === alfa_name)
	) {
		return 1;
	}
	const res = await insertAlfaName(alfa_name, user_id, false);
	return res;
}