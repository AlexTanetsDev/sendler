import axios from "axios";

const deleteClients = async (clientsId: number[]) => {

	if (clientsId.length > 0) {
		clientsId.forEach(async clientId => {
			try {
				const response = await axios.delete(`api/clients/${clientId}`);
				console.log(response.data.message);
			} catch (error: any) {
				console.log(error.message + ' | ' + error.response.data.error);
			}
		});
	}
};

export default deleteClients;