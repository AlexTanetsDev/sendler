"use client";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import UserSmsBalansInform from '@/components/UserSmsBalansInform';
import GroupsList from "@/components/groupsList";
import CreateGroupForm from "@/components/forms/CreateGroupForm";

import Title from "@/components/Title";

export default function ContactManagmentPage() {
	const { data: session } = useSession();
	const [groups, setGroups] = useState([]);
	const [isAddGroup, SetIsAddgroup] = useState(false);
	const userId = session?.user.user_id;

	const getGroups = async () => {
		if (userId) {
			const response = await axios.get(`api/sending-groups`, {
				params: {
					userId: userId,
				},
			});
			const data = response.data.groups;
			setGroups(data);
		}
	};

	const memoizedGetGroups = useCallback(getGroups, [userId]);

	const controlAddGroup = () => {
		SetIsAddgroup(!isAddGroup);
	};

	useEffect(() => {
		memoizedGetGroups();
	}, [userId, isAddGroup, memoizedGetGroups]);

	return (
		<section className="container mx-auto">
			<UserSmsBalansInform session={session} />
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block mt-[60px]">
				<p className='w-[724px] mb-[50px] ml-[26px] text-lg font-normal font-roboto'>Для початку роботи Вам потрібно створити нову Групу контактів та додати до неї номери. Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.</p>
				<CreateGroupForm id={userId} controlAdd={controlAddGroup} />
				<GroupsList groups={groups} />
				<div className="ml-[26px]">
					<p className="input__title mb-3">Всі контакти</p>
					<div className="flex items-center">
						<p className="mr-8 text-base font-normal font-roboto">За бажанням ви можете переглянути всі свої контакти</p>
						<button type="submit" className='action__btn'>Переглянути</button>
					</div>
				</div>
			</div>
		</section>
	);
}

