'use client';

import axios from "axios";

import { useState, useCallback, useEffect, } from "react";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";

export default function AllContactsUserPage({ params }: { params: { userId: string } }) {

	const [clients, SetClients] = useState([]);
	const [isAddGroup, SetIsAddgroup] = useState(false)

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
	}

	const memoizedGetClients = useCallback(getClients, [userId]);

	const updateListControl = () => {
		SetIsAddgroup(!isAddGroup);
	};

	useEffect(() => {
		memoizedGetClients();
	}, [userId, isAddGroup, memoizedGetClients]);

	return (
		<section>
			<div className="mb-[60px]">
				<Title type="h1" color="dark">Управління контактами</Title>
			</div>
			<Title type="h3" color="dark">Всі контакти</Title>
			<p className="w-[684px] mt-10 mb-[50px] font-montserrat text-base font-normal leading-6">У  данній  таблиці представленні всі ваші контакти. Ви можете переглянути детальну інформацію, а також  редагувати контакт.</p>
			<ClientsList clients={clients} updateListControl={updateListControl} />
		</section>
	)
};
