import axios from "axios";
import toast from 'react-hot-toast';

export async function getGroups(userId: number) {
	try {
		if (userId) {
			const res = await axios.get(`api/sending-groups`, {
				params: {
					userId: userId,
				},
			});
			return res.data.groups;
		}
	} catch (error: any) {
		toast.error(error.message + ' | ' + error.response.data.error, {
			position: 'bottom-center',
			className: 'toast_error',
			style: {
				backgroundColor: '#0F3952',
				color: '#fa9c9c',
				fontSize: '24px',
				marginBottom: '20%',
			},
		});
	}
};