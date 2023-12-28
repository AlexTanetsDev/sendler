'use client';

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

import { useForm } from "react-hook-form";

import { redirect } from "next/navigation";

import convertClientsBirthdayFormat from "@/helpers/ConvertClientsBirsdayFormat";

import { IClientDatabase, IClient } from "@/globaltypes/types";

type Props = {
	clients: IClientDatabase[];
	groupId?: number;
	updateListControl: any;
}

export default function ClientsList({ clients, groupId, updateListControl
}: Props) {

	clients = convertClientsBirthdayFormat(clients);

	const removeIdFromClientObject = (arrayIds: number[], arrayClints: IClientDatabase[]) => {
		const groupClients: IClient[] = [];
		arrayIds.forEach(arrayId => {
			arrayClints.map(arrayClint => {
				if (arrayClint.client_id === arrayId) {
					const groupClient: IClient = {
						tel: arrayClint.tel,
						first_name: arrayClint.first_name,
						middle_name: arrayClint.middle_name,
						last_name: arrayClint.last_name,
						date_of_birth: arrayClint.date_of_birth,
						parameter_1: arrayClint.parameter_1,
						parameter_2: arrayClint.parameter_2,
					}
					groupClients.push(groupClient);
				}
			})
		});
		return groupClients;
	}

	if (clients === undefined) {
		console.log('Unable to fetch groupClients!');
		redirect('/')
	};

	const {
		register,
		handleSubmit,
	} = useForm();

	const onSubmit = async (data: any) => {
		const deletedClientsId: number[] = [];
		const updateGroupClientsId: number[] = [];

		for (const key in data) {
			if (data[key] === true) {
				deletedClientsId.push(Number(key));
			};

			if (data[key] === false) {
				updateGroupClientsId.push(Number(key));
			};
		}

		if (groupId) {

			const updateClients: IClient[] = removeIdFromClientObject(updateGroupClientsId, clients)

			try {
				const response = await axios.put(`http://localhost:3000/api/sending-groups/${groupId}`, {
					clients: updateClients,
					cache: "no-store",
				});
				updateListControl();
				console.log(response.data.message);
			} catch (error: any) {
				console.log(error.message + " | " + error.response.data.error);
			}
		} else {
			deletedClientsId.forEach(async (deletedClientId) => {
				try {
					const response = await axios.delete(`http://localhost:3000/api/clients/${deletedClientId}`);
					console.log(response.data.message);
					updateListControl();
				} catch (error: any) {
					console.log(error.message + " | " + error.response.data.error);
				}
			})

		}
	};

	return (
		<div className="mb-[80px]">
			<div className='flex gap-x-8 w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable'>
				<p className='w-[158px] pl-[38px]'>Номер</p>
				<p className='w-[346px]'>Ім&apos;я(П.І.Б.)</p>
				<p className='w-[170px]'>Дата народження</p>
				<p className='w-[150px]'>Параметр 1</p>
				<p>Параметр 2</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="text-right px-[26px]">
				{clients.map((client: IClientDatabase) => (
					<li key={client.client_id} className="flex items-center h-[48px] text-base font-montserrat font-normal border-b border-rowUnderLine">
						<input
							{...register(`${client.client_id}`)}
							placeholder="bluebill1049@hotmail.com"
							type="checkbox"
							className="mr-6"
						/>
						<div className="flex items-center gap-x-8">
							<div className="w-[120px] text-left">{client.tel}</div>
							<div className="w-[346px] text-left">{client.last_name} {client.first_name} {client.middle_name}</div>
							<div className="w-[170px] text-left">{client.ua_date_of_birth}</div>
							<div className="w-[150px] text-left">{client.parameter_1}</div>
							<div className="w-[150px] text-left">{client.parameter_2}</div>
							<button className="row-table__btn">Редагувати</button>
						</div>
					</li>
				))}
				<div className="flex justify-end">
					<button type="submit" className='mt-[50px] delete__btn'>Видалити</button>
				</div>
			</form>
		</div>
	)
}

