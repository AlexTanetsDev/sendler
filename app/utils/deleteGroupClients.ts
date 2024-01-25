import axios from "axios";

const deleteGroupClients = async (groupId: number | undefined, clientsId: number[]) => {
	if (groupId && clientsId.length > 0) {
		try {
			const res = await axios.patch(`api/sending-groups/${groupId}`, {
				clients: clientsId,
			});
			console.log(res.data.message);
		} catch (error: any) {
			console.log(error.message + " | " + error.response);
		}
	}
};

export default deleteGroupClients;