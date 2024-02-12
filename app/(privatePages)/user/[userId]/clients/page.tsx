'use client';

import { useState, useCallback, useEffect } from 'react';

import Title from '@/components/Title';
import ClientsList from '@/components/ClientsList';
import SearchClientForm from '@/components/forms/SearchClientForm';
import { getUserClients } from '@/fetch-actions/clientsFetchActions';
import { IClientDatabase } from '@/globaltypes/types';

const LIMIT = 10;

export default function AllContactsUserPage({ params }: { params: { id: string, userId: string } }) {

	const [filter, setFilter] = useState<string>('');
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const [clients, setClients] = useState<IClientDatabase[] | undefined>([]);

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
		const res = await getUserClients(userId, filter, LIMIT, 0);
		if (res) {
			setClients(res);
		}
	};

	const memoizedupdateData = useCallback(updateData, [filter, userId]);

	useEffect(() => {
		memoizedupdateData();
	}, [memoizedupdateData, isUpdated]);

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block mt-[60px]">
				<div className="ml-[26px] mb-[50px]">
					<Title type="accent-main_text" color="dark">
						Всі контакти
					</Title>
				</div>
				<p className="w-[684px] ml-[26px] mt-10 mb-[50px] font-montserrat text-base font-normal leading-6">
					У данній таблиці представленні всі ваші контакти. Ви можете переглянути детальну
					інформацію, а також редагувати контакт.
				</p>
				<SearchClientForm getFilter={getFilter} resetFilter={resetFilter} />
				<div className="mt-[60px]">
					<ClientsList
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


