"use client";

import { useState, useCallback, useEffect, } from "react";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";
import SearchClientForm from "@/components/forms/SearchClientForm";
import { getGroupClientsAndGroupName } from "@/fetch-actions/clientsFetchActions";
import { IGroupId, IUserId, IClientDatabase } from "@/globaltypes/types";

const LIMIT = 10;

export default function EditGroupPage({ params }: { params: { id: IGroupId, userId: IUserId } }) {

	const [groupName, setGroupName] = useState('');
	const [filter, setFilter] = useState('');
	const [isUpdated, setIsUpdated] = useState(false);
	const [clients, setClients] = useState<IClientDatabase[] | undefined>([]);

	const groupId = Number(params.id);
	const userId = Number(params.userId);

	const getUpdate = () => {
		setIsUpdated(!isUpdated);
	};

	const getFilter = (e: any) => {
		setFilter(e.target.value);
	};

	const resetFilter = () => {
		setFilter('');
	};

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
