'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import GreenButton from './buttons/GreenButton';
import AddClient from './Addclient';
import Client from './Client';
import deleteClients from '@/app/utils/deleteClients';
import deleteGroupClients from '@/app/utils/deleteGroupClients';
import { IClientDatabase } from '@/globaltypes/types';
import LoadMore from './LoadMore';

type Props = {
	groupId?: number | undefined;
	filter: string;
	userId: number;
	convertClients: IClientDatabase[] | undefined;
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
	convertClients,
	isUpdated,
	LIMIT }: Props) {
	const [isSelected, setIsSelected] = useState(0);
	const { register, handleSubmit, reset } = useForm();


	const onSelect = (e: any) => {
		const { checked } = e.target;
		if (checked) {
			setIsSelected(isSelected + 1);
		} else {
			setIsSelected(isSelected - 1);
		}
	};

	const onSubmit = async (data: any) => {
		const deletedClientsId: number[] = [];

		for (const key in data) {
			if (data[key] === true) {
				deletedClientsId.push(Number(key));
			}
		}

		if (groupId) {
			await deleteGroupClients(groupId, deletedClientsId);
			setIsSelected(0);
			updateClients();
			getUpdate();
		} else {
			await deleteClients(deletedClientsId);
			setIsSelected(0);
			updateClients();
			getUpdate();
		}
		reset();

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
			<form onSubmit={handleSubmit(onSubmit)}>
				<ul className='h-[400px] overflow-auto'>
					{convertClients?.length ? (
						<>
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
						</>

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
						isDisabled={convertClients?.length && isSelected ? false : true} size="big">
						Видалити
					</GreenButton>
				</div>
			</form>
		</div>
	);
};


