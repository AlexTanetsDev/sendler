import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

type Props = {
	id: number | undefined;
}

export default async function GroupsList({ id }: Props) {

	try {
		const response = await axios.get(`api/sending-groups`, {
			params: {
				userId: id,
			},
		});
		const userGroups = response.data.groups;
		console.log(userGroups);
	} catch (error: any) {
		console.log(error.message + " | " + error.response.data.error);
	}

	return (
		<div className='flex w-full px-6 pt-4 pb-3 text-xl font-roboto font-normal bg-headerTable rounded-2xl'>
			<p className='mr-28'>Група</p>
			<p className='mr-24'>Оновлення</p>
			<p>Кількість</p>
		</div>
	)
}
