'use client';

import { useState, useCallback, useEffect } from 'react';

import Title from '@/components/Title';
import ClientsList from '@/components/ClientsList';
import SearchClientForm from '@/components/forms/SearchClientForm';
import getClients from '@/app/utils/getClients';
import convertClientsBirthdayFormat from '@/helpers/ConvertClientsBirsdayFormat';
import { IClientDatabase } from '@/globaltypes/types';

const LIMIT = 10;

export default function AllContactsUserPage({ params }: { params: { id: string, userId: string } }) {

	const [filter, setFilter] = useState('');
	const [isUpdated, setIsUpdated] = useState(false);
	const [clients, setClients] = useState<IClientDatabase[] | undefined>([]);
	const convertClients = convertClientsBirthdayFormat(clients);

	const userId = Number(params.userId);
	const groupId = Number(params.id);

	const getUpdate = () => {
		setIsUpdated(!isUpdated)
	};

	const getFilter = (e: any) => {
		setFilter(e.target.value);
	};

	const resetFilter = () => {
		setFilter('');
	};

	const updateClients = async () => {
		if (groupId) {
			const res = await getClients(userId, filter, LIMIT, 0, groupId);
			setClients(res);
		} else {
			const res = await getClients(userId, filter, LIMIT, 0);
			setClients(res);
		}
	};

	const memoizedUpdateStartClients = useCallback(updateClients, [filter, userId, groupId]);

	useEffect(() => {
		memoizedUpdateStartClients();
	}, [memoizedUpdateStartClients, isUpdated])

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
						updateClients={updateClients}
						getUpdate={getUpdate}
						convertClients={convertClients}
						isUpdated={isUpdated}
						LIMIT={LIMIT}
					/>
				</div>
			</div>
		</section>
	);
}


