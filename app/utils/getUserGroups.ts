import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

import { IGroupDatabase } from "@/globaltypes/types";

export default async function getUserGroups(id: number | undefined) {
	try {
		const response = await axios.get(`api/sending-groups`, {
			params: {
				userId: id,
			},
		});

		const groups: IGroupDatabase[] = response.data.groups;

		return groups;
	} catch (error: any) {
		console.log(error.message + " | " + error.response.data.error);
	}
}