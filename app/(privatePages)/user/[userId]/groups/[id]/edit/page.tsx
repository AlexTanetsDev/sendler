"use client";

import { useState, useCallback, useEffect, } from "react";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";
import SearchClientForm from "@/components/forms/SearchClientForm";
import { getGroupClientsAndGroupName } from "@/fetch-actions/clientsFetchActions";
import { IGroupId, IUserId, IClientDatabase } from "@/globaltypes/types";

const LIMIT = 10;

export default function EditGroupPage({ params }: { params: { id: IGroupId, userId: IUserId } }) {

	const [groupName, setGroupName] = useState<string>('');
	const [filter, setFilter] = useState<string>('');
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const [clients, setClients] = useState<IClientDatabase[] | undefined>([]);

	const groupId = Number(params.id);
	const userId = Number(params.userId);

	// update page if list of clients or client in database are updated
	const getUpdate = () => {
		setIsUpdated(!isUpdated);
	};

	// update list of clients if filter is changed
	const getFilter = (e: any) => {
		setFilter(e.target.value);
	};

	// update list of clients if filter is cleaned
	const resetFilter = () => {
		setFilter('');
	};

	//get data from database
	const updateData = async () => {
		const res = await getGroupClientsAndGroupName(groupId, filter, LIMIT, 0);
		if (res) {
			const { clients, groupName } = res;
			setClients(clients);
			setGroupName(groupName);
		}
	};

	const memoizedupdateData = useCallback(updateData, [filter, groupId]);

	useEffect(() => {
		memoizedupdateData();
	}, [memoizedupdateData, isUpdated])

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">Управління контактами</Title>
			<div className="content-block mt-[60px]">
				<div className="ml-[26px] mb-[50px]">
					<Title type="title_block" color="dark">Редагування групи: <span className="ml-4 text-headerTable">{groupName}</span></Title>
				</div>
				<SearchClientForm getFilter={getFilter} resetFilter={resetFilter} />
				<div className="mt-[60px]">
					<ClientsList
						groupId={groupId}
						filter={filter}
						userId={userId}
						updateClients={updateData}
						getUpdate={getUpdate}
						clients={clients}
						isUpdated={isUpdated}
						LIMIT={LIMIT}
					/>
				</div>
			</div>
		</section>
	);
}
