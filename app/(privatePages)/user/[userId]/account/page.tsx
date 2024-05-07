'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSession } from 'next-auth/react';

import Title from '@/components/Title';
import { UpdateUserForm } from '@/components/forms/UpdateUserForm';
import CreateAccount from '@/components/CreateAccount';
import PaymentsList from '@/components/PaymentsList';
import { getUser } from '@/fetch-actions/usersFetchActions';

import { IUser } from '@/globaltypes/types';
import React from 'react';
import CircleDiagram from '@/components/CircleDiagram';

import LineDiagram from '@/components/LineDiagram';
import TablePrices from '@/components/TablePrices';
import Image from 'next/image';


export default function UserAccountPage() {
	const { data: session } = useSession();

	const userId = session?.user.user_id;
	const [user, setUser] = useState<IUser>();
	const [socket, setSocket] = useState<any>(undefined);
	// const [sending, setSending] = useState<ISendingProcess>();
	const message = userId;
	const roomName = userId;
	let NEXT_PUBLIC_SOCKET_URL: string;

	if (process.env.NEXT_PUBLIC_SOCKET_URL) {
		NEXT_PUBLIC_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
	} else {
		NEXT_PUBLIC_SOCKET_URL = 'http://localhost:1080';
	}

	useEffect(() => {
		const getData = async () => {
			if (userId) {
				const res = await getUser(userId);
				if (res) {
					setUser(res.data.user);
				};
			};
		};
		const socket = io(NEXT_PUBLIC_SOCKET_URL);

		getData();
		setSocket(socket);
		socket.on('message', user => {
			if (user) {
				setUser(user);
			};
		});

		// console.log("USER", user)
	}, [userId, message, roomName, NEXT_PUBLIC_SOCKET_URL]);


	const data = [
		{ name: 'Відхилені', value: user?.rejected_sms },
		{ name: 'Усього доставлено', value: user?.delivered_sms },
		{ name: 'В процесі відправки', value: user?.pending_sms },
	];

	const [expanded, setExpanded] = useState(true);

	const toggleDescription = () => {
		setExpanded(!expanded);
	};

	return (
		<>
			<Title type="h2" color="dark">
				Особистий кабінет
			</Title>
			<div className="content-block mb-20 mt-[50px] px-[26px] r">
				<div className='flex  items-center mb-20'>
					<div>
						<div className="mb-10">
							<Title type="accent-main_text" color="dark">
								Кількість СМС
							</Title>
						</div>
						<div className="flex gap-16">
							<div className="flex flex-col gap-8">
								<div className="flex">
									<div className="w-44 mr-2">Проплачено СМС</div>
									<div className="min-w-[80px] text-end text-xl font-montserrat font-normal mr-2">{user?.paid_sms}</div>
									<div className="text-xl font-montserrat font-normal">SMS</div>
								</div>
								<div className="flex">
									<div className="w-44 mr-2">Скореговано СМС</div>
									<div className="min-w-[80px] text-end text-xl font-montserrat font-normal mr-2">{user?.adjusment_sms}</div>
									<div className="text-xl font-montserrat font-normal">SMS</div>
								</div>
								<div className="flex">
									<div className="w-44 mr-2">Баланс на рахунку</div>
									<div className="min-w-[80px] text-end text-xl font-montserrat font-normal mr-2">{user?.balance}</div>
									<div className="text-xl font-montserrat font-normal">SMS</div>
								</div>
							</div>
							<div className="flex flex-col gap-8">
								<div className="flex">
									<div className="w-52 mr-2">Всього відправлено</div>
									<div className="min-w-[80px] text-end text-xl font-montserrat font-normal mr-2">{user?.sent_sms}</div>
									<div className="text-xl font-montserrat font-normal">SMS</div>
								</div>
								<div className="flex relative">
									<div className="w-52 mr-2">Усього доставлено</div>
									<div className="min-w-[80px] text-end text-xl font-montserrat font-normal mr-2">{user?.delivered_sms}</div>
									<div className="text-xl font-montserrat font-normal">SMS</div>
									<div className="h-5 w-5 rounded-full bg-[#FFBB28]  absolute right-[-30px] top-1/2 transform -translate-y-1/2"></div>
								</div>
								<div className="flex relative">
									<div className="w-52 mr-2  ">В процесі відправки</div>
									<div className="min-w-[80px] text-end text-xl font-montserrat font-normal mr-2">{user?.pending_sms}</div>
									<div className="text-xl font-montserrat font-normal">SMS</div>
									<div className="h-5 w-5 rounded-full bg-[#00C49F] absolute right-[-30px] top-1/2 transform -translate-y-1/2"></div>
								</div>
								<div className="flex relative">
									<div className="w-52 mr-2">Відхилені</div>
									<div className="min-w-[80px] text-end text-xl font-montserrat font-normal mr-2">{user?.rejected_sms}</div>
									<div className="text-xl font-montserrat font-normal">SMS</div>
									<div className="h-5 w-5 rounded-full  bg-[#0088FE] absolute right-[-30px] top-1/2 transform -translate-y-1/2"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-[300px] h-[300px] p-2 ml-40">
						<CircleDiagram data={data} />
					</div>
				</div>
				{!((user?.sendingSms)?.length === 0) && (
					<>
						<p className='mb-4'>Стан відправки СМС в реальному часі:</p>
						<ul>
							{user?.sendingSms?.map((item, index) => (
								<li key={index}>
									<LineDiagram process={item} />
								</li>
							))}
						</ul>
					</>
				)}
			</div>
			<div className="content-block mb-20">
				<div className="pl-[26px]">
					<Title type="accent-main_text" color="dark">
						Історія платежів
					</Title>
				</div>
				{userId && <PaymentsList arrayUserPaymentHistory={user?.paymentHistory} />}
			</div>
			<div className="content-block mb-20 pl-[26px]">
				<Title type="accent-main_text" color="dark">
					Поповнити рахунок
				</Title>
				<p className="mt-10 mb-3">Введіть потрібну кількість SMS</p>
				<CreateAccount />
				<button
					onClick={toggleDescription}
					className="flex justify-between  items-center text-start lg:w-[746px] w-[626px] py-4 lg:py-5 mb-12 border border-cyan-700 rounded-[18px] px-6 lg:ml-6"
				>
					<h3 className="max-w-[575px] lg:max-w-none lg:text-xl text-lg font-roboto block">Переглянути ціну за SMS</h3>
					<span className="block ml-10">
						{expanded ? (
							<Image
								src="/svg/arrow-down.svg"
								alt="buton detailes"
								width={32}
								height={32}
							/>
						) : (
							<Image
								src="/svg/arrow-up.svg"
								alt="buton detailes"
								width={32}
								height={32}
							/>
						)}
					</span>
				</button>
				<div
					className={` text-[16px] mt-4 lg:mt-5 lg:pr-[196px] pb-4 lg:pb-5 ${expanded ? "hidden " : " blok"
						}`}
				>
					<TablePrices />
				</div>
				<p className="w-[906px] text-xl accent-main_text">
					Якщо Ви працюєте з ТОВ &quot;Інноваційні медіа рішення&quot; за договором як Юридична
					особа, то для виставлення рахунку Вам потрібно зв&apos;язатися з нами або зателефонувати
					нам за номером (097) 678-12-59.
				</p>
			</div>
			<UpdateUserForm userId={userId} />
		</>
	);
}
