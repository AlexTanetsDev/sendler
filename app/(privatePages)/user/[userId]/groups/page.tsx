"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import GroupsList from "@/components/groupsList";
import CreateGroupForm from "@/components/forms/CreateGroupForm";
import GreenButton from "@/components/buttons/GreenButton";
import Title from "@/components/Title";
import { getUserGroups } from '@/fetch-actions/groupsFetchActions';
import { IGroupDatabase } from '@/globaltypes/types';

export default function ContactManagmentPage({ params }: { params: { userId: string } }) {
	const [groups, setGroups] = useState<IGroupDatabase[] | undefined>([]);
	const userId = Number(params.userId);

	const getData = async () => {
		const res = await getUserGroups(userId);
		if (res) {
			setGroups(res);
		}
	};

	const memoizedgetData = useCallback(getData, [userId]);

	useEffect(() => {
		memoizedgetData();
	}, [memoizedgetData]);

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block mt-[60px]">
				<p className='w-[724px] mb-[50px] ml-[26px] main-text'>Для початку роботи Вам потрібно створити нову Групу контактів та додати до неї номери. Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.</p>
				<CreateGroupForm id={userId} getGroups={getData} />
				<GroupsList groups={groups} getGroups={getData} />
				<div className="ml-[26px]">
					<p className="accent-main_text mb-3">Всі контакти</p>
					<div className="flex items-center">
						<p className="mr-8 main-text">За бажанням ви можете переглянути всі свої контакти</p>
						<GreenButton size="normal">
							<Link href={`/user/${userId}/clients`}>
								Переглянути
							</Link>
						</GreenButton>
					</div>
				</div>
			</div>
		</section>
	);
}

