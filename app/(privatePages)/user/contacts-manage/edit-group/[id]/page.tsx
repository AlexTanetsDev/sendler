"use client";

import axios from "axios";

import { useState, useCallback, useEffect, } from "react";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";

export default function EditGroupPage({ params }: { params: { id: string } }) {

	const [clients, SetClients] = useState([]);
	const [isAddGroup, SetIsAddgroup] = useState(false);
	const [groupName, SetGroupName] = useState('');

	const groupId = Number(params.id);

	const getClients = async () => {
		try {
			if (groupId) {
				const response = await axios.get(`api/sending-groups/${groupId}`);
				const { clients, group } = response.data.res;

				SetClients(clients);
				SetGroupName(group);
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
				<Title type="h2" color="dark">Редагування групи: <span className="ml-4 text-headerTable">{groupName}</span></Title>
			</div>
			<div className="mt-[60px]">
				<ClientsList clients={clients} groupId={groupId} updateListControl={updateListControl} />
			</div>
		</main>
	);
}
