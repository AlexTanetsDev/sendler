"use client";

import axios from "axios";

import { useState, useCallback, useEffect, } from "react";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";

export default function EditGroupPage({ params }: { params: { id: string } }) {

	const [clients, SetClients] = useState([]);
	const [isAddGroup, SetIsAddgroup] = useState(false)

	const groupId = Number(params.id);

	const getClients = async () => {
		try {
			if (groupId) {
				const response = await axios.get(`api/sending-groups/${groupId}`, {
				});

				const data = response.data.clients;
				SetClients(data);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	}

	const memoizedGetClients = useCallback(getClients, [groupId]);

	const updateListControl = () => {
		SetIsAddgroup(!isAddGroup);
	};

	useEffect(() => {
		memoizedGetClients();
	}, [groupId, isAddGroup, memoizedGetClients]);


	return (
		<main className="container mx-auto">
			<Title type="h1" color="dark">Управління контактами</Title>
			<div className="flex mt-[50px]">
				<Title type="h2" color="dark">Редагування групи:</Title>
			</div>
			<div className="mt-[60px]">
				<ClientsList clients={clients} groupId={groupId} updateListControl={updateListControl} />
			</div>
		</main>
	);
}
