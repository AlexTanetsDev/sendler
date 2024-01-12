"use client";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import GroupsList from "@/components/groupsList";
import CreateGroupForm from "@/components/forms/CreateGroupForm";
import GreenButton from "@/components/buttons/GreenButton";
import Title from "@/components/Title";


export default function ContactManagmentPage({ params }: { params: { userId: string } }) {
	const [groups, setGroups] = useState([]);
	const userId = Number(params.userId);

	const getGroups = async () => {
		try {
			if (userId) {
				const response = await axios.get(`api/sending-groups`, {
					params: {
						userId: userId,
					},
				});
				const data = response.data.groups;
				setGroups(data);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const memoizedGetGroups = useCallback(getGroups, [userId]);

	useEffect(() => {
		memoizedGetGroups();
	}, [memoizedGetGroups]);

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block mt-[60px]">
				<p className='w-[724px] mb-[50px] ml-[26px] main-text'>Для початку роботи Вам потрібно створити нову Групу контактів та додати до неї номери. Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.</p>
				<CreateGroupForm id={userId} getGroups={getGroups} />
				<GroupsList groups={groups} getGroups={getGroups} />
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

