'use client';

import axios from "axios";

import { useState, useCallback, useEffect, } from "react";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";
import SearchClientForm from "@/components/forms/SearchClientForm";
import { IClientDatabase } from "@/globaltypes/types";

export default function AllContactsUserPage({ params }: { params: { userId: string } }) {

	const [clients, SetClients] = useState([]);
	const [isAddGroup, SetIsAddgroup] = useState(false);
	const [filter, setFilter] = useState('');

	const userId = Number(params.userId);

	const getClients = async () => {
		try {
			if (userId) {
				const response = await axios.get(`api/clients`, {
					params: {
						userId: userId,
					},
				});

				const data = response.data.clients;
				SetClients(data);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const getFilter = (e: any) => {
		setFilter(e.target.value);
	};

	const resetFilter = () => {
		setFilter('');
	};

	const memoizedGetClients = useCallback(getClients, [userId]);

	const updateListControl = () => {
		SetIsAddgroup(!isAddGroup);
	};

	const filteredClients = () => {
		const filteredArray: IClientDatabase[] = [];
		clients.map(client => {
			const { tel } = client;
			if (String(tel).includes(filter)) {
				filteredArray.push(client);
			};
		}
		);
		return filteredArray;
	};

	const deleteClients = async (groupId: number | undefined, clientsId: number[]) => {

		if (clientsId.length > 0) {
			clientsId.forEach(async (clientId) => {
				try {
					const response = await axios.delete(`api/clients/${clientId}`);
					console.log(response.data.message);
					updateListControl();
				} catch (error: any) {
					console.log(error.message + " | " + error.response.data.error);
				}
			});
		};
	}

	useEffect(() => {
		memoizedGetClients();
	}, [userId, isAddGroup, memoizedGetClients]);

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">Управління контактами</Title>
			<div className="content-block mt-[60px]">
				<div className="ml-[26px] mb-[50px]">
					<Title type="accent-main_text" color="dark">Всі контакти</Title>
				</div>
				<p className="w-[684px] ml-[26px] mt-10 mb-[50px] font-montserrat text-base font-normal leading-6">У  данній  таблиці представленні всі ваші контакти. Ви можете переглянути детальну інформацію, а також  редагувати контакт.</p>
				<SearchClientForm getFilter={getFilter} resetFilter={resetFilter} />
				<div className="mt-[60px]">
					<ClientsList filteredClients={filteredClients()} deleteClients={deleteClients} getClients={getClients} />
				</div>
			</div>
		</section>
	)
};
