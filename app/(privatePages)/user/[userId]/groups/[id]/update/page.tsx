'use client';

import { useState, useCallback, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx/xlsx.mjs';
import Image from 'next/image';

import Title from '@/components/Title';
import GreenButton from '@/components/buttons/GreenButton';
import { getGroupClientsAndGroupName } from '@/fetch-actions/clientsFetchActions';
import updateGroup from '@/fetch-actions/updateGroup';
import { IGroupId, IUserId } from '@/globaltypes/types';

export default function UpdateGroupPage({ params }: { params: { id: IGroupId, userId: IUserId } }) {
	const userId = Number(params.userId);
	const groupId = Number(params.id);
	const router = useRouter();
	const [file, setFile] = useState<File>();
	const [groupName, setGroupName] = useState('');
	const [numberClients, setNumberClients] = useState(0);

	const getData = async () => {
		if (groupId) {
			const res = await getGroupClientsAndGroupName(groupId, '', null, 0);
			if (res) {
				const { groupName, clients } = res;
				setGroupName(groupName);
				setNumberClients(clients.length);
			}
		}
	};

	const memoizedgetgetData = useCallback(getData, [groupId]);

	useEffect(() => {
		memoizedgetgetData();
	}, [memoizedgetgetData]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		};
	};
	const xport = useCallback(async () => {
		if (file) {
			const header = [
				'first_name',
				'middle_name',
				'last_name',
				'tel',
				'date_of_birth',
				'parameter_1',
				'parameter_2',
			];
			const ab = await file.arrayBuffer();
			const wb = XLSX.read(ab);
			const wsname = wb.SheetNames[0];
			const clients = XLSX.utils.sheet_to_json(wb.Sheets[wsname], { header });

			await updateGroup(clients, groupId);
			router.push(`/user/${userId}/groups`);
		} else {
			console.log('Please, select a file!');
		}
	}, [file, groupId, router, userId]);

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block mt-[53px]">
				<div className=" ml-[26px]">
					<Title type="title_block" color="dark">
						Редагування групи:
						<span className="ml-4 text-headerTable">{`${groupName} (${numberClients})`}</span>
					</Title>
				</div>
				<p className="w-[724px] mb-[50px] mt-10 ml-[26px] text-left main_text">
					Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.
					Виберіть файл, який містить Ваші контакти:
				</p>
				<p className="block ml-[26px] mb-3 label"> Додати контакт з файлу</p>
				<div className="relative flex flex-row text-base flex items-center justify-start ml-[26px]">
					<label
						htmlFor="file"
						className="flex items-center justify-between w-[474px] block input w-8 h-[48px] mr-8 pr-[28px]  pl-[28px] bg-slate-300 hover:cursor-pointer"
					>
						<div className="grow main_text">{file?.name}</div>
						<Image src="/svg/paper-clip.svg" alt="paper clip" width={32} height={32} className="" />
					</label>
					<input
						type="file"
						id="file"
						name="file"
						accept=".xls,.xlsx"
						onChange={handleFileChange}
						className="absolute input_file h-[48px]bg-slate-300"
					/>
					<GreenButton size="normal" onClick={xport}>
						Додати
					</GreenButton>
				</div>
			</div>
		</section>
	);
}
