'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import RSC from "react-scrollbars-custom";

import GreenButton from './buttons/GreenButton';
import AddClient from './Addclient';
import Client from './Client';
import { deleteClients } from '@/fetch-actions/clientsFetchActions';
import { deleteGroupClients } from '@/fetch-actions/clientsFetchActions';
import { IClientDatabase } from '@/globaltypes/types';
import LoadMore from './LoadMore';
import convertClientsBirthdayFormat from '@/helpers/ConvertClientsBirsdayFormat';

type Props = {
	groupId?: number | undefined;
	filter: string;
	userId: number;
	clients: IClientDatabase[] | undefined;
	getUpdate: () => void;
	updateClients: () => Promise<void>;
	isUpdated: boolean;
	LIMIT: number;
};

export default function ClientsList({
	groupId,
	filter,
	userId,
	getUpdate,
	updateClients,
	clients,
	isUpdated,
	LIMIT }: Props) {

	const [isSelected, setIsSelected] = useState(0);
	const { register, handleSubmit, reset } = useForm();
	const [isDisabled, setIsDisabled] = useState(false);
	const convertClients = convertClientsBirthdayFormat(clients);

	// variable for control of state of delete button
	const onSelect = (e: any) => {
		const { checked } = e.target;
		if (checked) {
			setIsSelected(isSelected + 1);
		} else {
			setIsSelected(isSelected - 1);
		}
	};

	const onSubmit = async (data: any) => {

		setIsDisabled(true);
		// create array of client_id that should be deleted
		const deletedClientsId: number[] = [];
		for (const key in data) {
			if (data[key] === true) {
				deletedClientsId.push(Number(key));
			}
		}

		if (groupId) {
			// delete clients from group
			await deleteGroupClients(groupId, deletedClientsId);
			setIsSelected(0);
			updateClients();
			getUpdate();
		} else {
			// delete clients from list of clients
			await deleteClients(deletedClientsId);
			setIsSelected(0);
			updateClients();
			getUpdate();
		}
		reset();
		setIsDisabled(false);
	};

	return (
		<div className="mb-[80px]">
			<div className="flex gap-x-8 w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable">
				<p className="w-[158px] pl-[38px]">Номер</p>
				<p className="w-[346px]">Ім&apos;я(П.І.Б.)</p>
				<p className="w-[170px]">Дата народження</p>
				<p className="w-[150px]">Параметр 1</p>
				<p>Параметр 2</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className='scroll-bar'>
				<ul className='h-[432px] overflow-auto'>
					{convertClients?.length ? (
						<RSC style={{ height: "100%" }}>
							{convertClients.map(convertClient => (
								<Client
									key={convertClient.client_id}
									convertClient={convertClient}
									groupId={groupId}
									updateClients={updateClients}
									getUpdate={getUpdate}
									register={register}
									onSelect={onSelect} />
							))}
							<LoadMore
								userId={userId}
								groupId={groupId}
								filter={filter}
								register={register}
								onSelect={onSelect}
								isUpdated={isUpdated}
								LIMIT={LIMIT}
								getUpdate={getUpdate}
							/>
						</RSC>

					) : (
						<>
							<div className="flex  px-[26px] items-center h-[48px]  text-base font-montserrat font-normal border-b border-rowUnderLine">
								<span>1</span>
							</div>
							<div className="h-[48px] border-b border-rowUnderLine"></div>
							<div className="h-[48px] border-b border-rowUnderLine"></div>
						</>
					)}
				</ul>
				<div className="flex mr-[26px] pt-[50px] justify-end">
					<div className="flex mr-[26px] justify-end">
						{groupId &&
							<AddClient
								groupId={groupId}
								updateClients={updateClients}
								getUpdate={getUpdate} />}
					</div>
					<GreenButton
						isDisabled={convertClients?.length && isSelected ? false : true || isDisabled} size="big">
						Видалити
					</GreenButton>
				</div>
			</form>
		</div>
	);
};


