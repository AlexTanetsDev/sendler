"use client";

import axios from "axios";

import { useState, useCallback, useEffect, } from "react";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";
import SearchClientForm from "@/components/forms/SearchClientForm";

export default function EditGroupPage({ params }: { params: { id: string } }) {

	const [clients, setClients] = useState([]);
	const [isAddGroup, setIsAddgroup] = useState(false);
	const [groupName, setGroupName] = useState('');

	const groupId = Number(params.id);

	const getClients = async () => {
		try {
			if (groupId) {
				const response = await axios.get(`api/sending-groups/${groupId}`);
				const { clients, group } = response.data.res;

				setClients(clients);
				setGroupName(group);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	}

	const memoizedGetClients = useCallback(getClients, [groupId]);

	const updateListControl = () => {
		setIsAddgroup(!isAddGroup);
	};

	useEffect(() => {
		memoizedGetClients();
	}, [isAddGroup, memoizedGetClients]);


	return (
		<main className="container mx-auto">
			<Title type="h1" color="dark">Управління контактами</Title>
			<div className="content-block mt-[50px]">
				<div className="ml-[26px] mb-[50px]">
					<Title type="h2" color="dark">Редагування групи: <span className="ml-4 text-headerTable">{groupName}</span></Title>
				</div>
				<SearchClientForm />
				<div className="mt-[60px]">
					<ClientsList clients={clients} groupId={groupId} updateListControl={updateListControl} />
				</div>
			</div>
		</main>
	);
}
