"use client";

import axios from "axios";

import { useState, useCallback, useEffect, } from "react";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";
import SearchClientForm from "@/components/forms/SearchClientForm";
import { IClientDatabase, IGroupId } from "@/globaltypes/types";

export default function EditGroupPage({ params }: { params: { id: IGroupId } }) {

	const [clients, setClients] = useState([]);
	const [groupName, setGroupName] = useState('');
	const [filter, setFilter] = useState('');

	const groupId = Number(params.id);

	const getClients = async () => {
		try {
			if (groupId) {
				const response = await axios.get(`api/sending-groups/${groupId}`);
				const group: string = response.data.res.group;
				const clientsGroup = response.data.res.clients;

				setClients(clientsGroup);
				setGroupName(group);
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

	const memoizedGetClients = useCallback(getClients, [groupId]);

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

		if (groupId && clientsId.length > 0) {

			try {
				const res = await axios.patch(`api/sending-groups/${groupId}`, {
					clients: clientsId,
				});
				const { clients } = res.data.resGet
				setClients(clients);
				console.log(res.data.message);
			} catch (error: any) {
				console.log(error.message + " | " + error.response);
			}
		}
	}

	useEffect(() => {
		memoizedGetClients();
	}, [memoizedGetClients]);

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">Управління контактами</Title>
			<div className="content-block mt-[60px]">
				<div className="ml-[26px] mb-[50px]">
					<Title type="title_block" color="dark">Редагування групи: <span className="ml-4 text-headerTable">{groupName}</span></Title>
				</div>
				<SearchClientForm getFilter={getFilter} resetFilter={resetFilter} />
				<div className="mt-[60px]">
					<ClientsList filteredClients={filteredClients()} groupId={groupId} deleteClients={deleteClients} getClients={getClients} />
				</div>
			</div>
		</section>
	);
}
