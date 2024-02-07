import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL_INTERNAL
});

axiosInstance.interceptors.response.use(
	(res) => {
		if (res.data.message) {
			toast.success(res.data.message, {
				duration: 3000,
				position: 'bottom-center',
				className: 'toast_success',
				style: {
					backgroundColor: '#0F3952',
					color: "lightgreen",
					fontSize: '24px',
					borderColor: 'green',
					marginBottom: '50%'
				}
			});
		}
		return res;
	},
	(error) => {
		if (axios.isAxiosError(error)) {
			if (error.response?.data.message) {
				toast.error(error.response.status + ' | ' + error.response?.data.message, {
					position: 'bottom-center',
					className: 'toast_error',
					style: {
						backgroundColor: '#0F3952',
						color: '#fa9c9c',
						fontSize: '24px',
						marginBottom: '50%',
					},
				});
			} else {
				toast.error(error.response?.status + ' | ' + error.response?.statusText, {
					position: 'bottom-center',
					className: 'toast_error',
					style: {
						backgroundColor: '#0F3952',
						color: '#fa9c9c',
						fontSize: '24px',
						marginBottom: '50%',
					},
				});
			};
		} else {
			toast.error(error.message, {
				position: 'bottom-center',
				className: 'toast_error',
				style: {
					backgroundColor: '#0F3952',
					color: '#fa9c9c',
					fontSize: '24px',
					marginBottom: '50%',
				},
			});
		};
	}
)


