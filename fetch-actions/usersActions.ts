import axios from "axios";
import toast from "react-hot-toast";

export async function getUser(userId: number | undefined) {
	try {
		const res = await axios.get(`/api/users/${userId}`);
		return res;
	} catch (error: any) {
		toast.error(error.message + " | " + error.response.data.message,
			{
				position: 'bottom-center',
				className: 'toast_error',
				style: {
					backgroundColor: '#0F3952',
					color: "#fa9c9c",
					fontSize: '24px',
					borderBlockColor: 'red',
					marginBottom: '20%'
				}
			});
	}
};

export async function updateUser(
	userId: number | undefined,
	login: string,
	password: string,
	newPassword: string,
	userName: string,
	phone: number,
	email: string) {
	try {
		const res = await axios.put(`api/users/${userId}`,
			{
				userLogin: login,
				password: password,
				newPassword: newPassword,
				userName: userName,
				tel: phone,
				email: email,
			}
		);
		toast.success(res.data.message, {
			duration: 3000,
			position: 'bottom-center',
			className: 'toast_success',
			style: {
				backgroundColor: '#0F3952',
				color: "lightgreen",
				fontSize: '24px',
				borderColor: 'green',
				marginBottom: '20%'
			}
		});
		return res;
	} catch (error: any) {
		toast.error(error.message + " | " + error.response.data.message,
			{
				position: 'bottom-center',
				className: 'toast_error',
				style: {
					backgroundColor: '#0F3952',
					color: "#fa9c9c",
					fontSize: '24px',
					marginBottom: '20%'
				}
			});
	}
}
