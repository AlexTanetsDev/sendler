'use client';

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Client from './Client';
import { getGroupClientsAndGroupName } from "@/fetch-actions/clientsFetchActions";
import { getUserClients } from '@/fetch-actions/clientsFetchActions';
import convertClientsBirthdayFormat from '@/helpers/ConvertClientsBirsdayFormat';

import { IClientDatabase } from "@/globaltypes/types";
import { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
	groupId?: number | undefined;
	filter: string;
	userId: number;
	register: UseFormRegister<FieldValues>
	onSelect: (e: any) => void;
	getUpdate: () => void;
	isUpdated: boolean;
	LIMIT: number;
};

export default function LoadMore({
	userId,
	filter,
	groupId,
	register,
	onSelect,
	getUpdate,
	isUpdated,
	LIMIT }: Props) {
	const [clients, setClients] = useState<IClientDatabase[]>([]);
	const [visible, setVisible] = useState(LIMIT);
	const convertClients = convertClientsBirthdayFormat(clients);

	const [ref, inView] = useInView();

	const loadMoreClients = async () => {

		if (visible <= clients.length + LIMIT)
			if (groupId) {
				const res = await getGroupClientsAndGroupName(groupId, filter, LIMIT, visible);
				if (res) {
					const { clients } = res ?? [];
					const newContacts = clients;
					setClients((prevClients: IClientDatabase[]) => [...prevClients, ...newContacts]);
					setVisible(visible + LIMIT);
				}
			} else {
				const newContacts = (await getUserClients(userId, filter, LIMIT, visible)) ?? [];
				setClients((prevClients: IClientDatabase[]) => [...prevClients, ...newContacts]);
				setVisible(visible + LIMIT);
			}
	}

	const memoizedLoadMoreContacts = useCallback(loadMoreClients, [userId, filter, visible, groupId, clients.length, LIMIT])

	useEffect(() => {
		setClients([]);
		setVisible(LIMIT);
	}, [isUpdated, LIMIT, filter])

	useEffect(() => {
		if (inView) {
			memoizedLoadMoreContacts();
		}
	}, [inView, memoizedLoadMoreContacts]);

	return (
		<>
			{convertClients?.map(convertClient => (
				<Client
					key={2 * (convertClient.client_id)}
					convertClient={convertClient}
					groupId={groupId}
					updateClients={loadMoreClients}
					getUpdate={getUpdate}
					register={register}
					onSelect={onSelect} />
			))}
			<div ref={ref}>
				{visible <= clients.length + LIMIT ?
					<h4 className="text-center font-medium">Loading ...</h4> :
					<h4 className="text-center font-medium">There are no more clients.</h4>}
			</div>
		</>
	);
};