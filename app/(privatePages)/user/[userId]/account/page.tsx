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



export default function UserAccountPage() {
	const { data: session } = useSession();

	const userId = session?.user.user_id;
	const [user, setUser] = useState<IUser>();
	const [socket, setSocket] = useState<any>(undefined);
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
				}
			}
		};
		const socket = io(NEXT_PUBLIC_SOCKET_URL);

		getData();
		setSocket(socket);
		socket.on('message', user => {
			if (user) {
				setUser(user);
			}
		});
	}, [userId, message, roomName, NEXT_PUBLIC_SOCKET_URL]);

	const data = [
		{ name: 'Проплачено СМС', value: user?.paid_sms },
		{ name: 'Скореговано СМС', value: user?.adjusment_sms },
		{ name: 'Баланс на рахунку', value: user?.balance },
		{ name: 'Всього відправлено', value: user?.sent_sms },
		{ name: 'Усього доставлено', value: user?.delivered_sms },
		{ name: 'В процесі відправки', value: user?.pending_sms },

	];


	return (
		<>
			<Title type="h2" color="dark">
				Особистий кабінет
			</Title>
			<div className="content-block mb-20 mt-[50px] pl-[26px] flex  items-center">
				<div>
					<div className="mb-10">
						<Title type="accent-main_text" color="dark">
							Кількість СМС
						</Title>
					</div>
					<div className="flex gap-16">
						<div className="flex flex-col gap-8">
							<div className="flex">
								<div className="w-52 mr-2">Проплачено СМС</div>
								<div className="text-xl font-montserrat font-normal">{user?.paid_sms} SMS</div>
							</div>
							<div className="flex">
								<div className="w-52 mr-2">Скореговано СМС</div>
								<div className="text-xl font-montserrat font-normal">{user?.adjusment_sms} SMS</div>
							</div>
							<div className="flex">
								<div className="w-52 mr-2">Баланс на рахунку</div>
								<div className="text-xl font-montserrat font-normal">{user?.balance} SMS</div>
							</div>
						</div>
						<div className="flex flex-col gap-8">
							<div className="flex">
								<div className="w-52 mr-2">Всього відправлено</div>
								<div className="text-xl font-montserrat font-normal">{user?.sent_sms} SMS</div>
							</div>
							<div className="flex">
								<div className="w-52 mr-2">Усього доставлено</div>
								<div className="text-xl font-montserrat font-normal">{user?.delivered_sms} SMS</div>
							</div>
							<div className="flex">
								<div className="w-52 mr-2">В процесі відправки</div>
								<div className="text-xl font-montserrat font-normal">{user?.pending_sms} SMS</div>
							</div>
							<div className="flex">
								<div className="w-52 mr-2">Відхилені</div>
								<div className="text-xl font-montserrat font-normal">{user?.rejected_sms} SMS</div>
							</div>
						</div>

					</div>
				</div>
				<div className='w-[300px] h-[300px] p-2 ml-20'>
					<CircleDiagram data={data} />
				</div>
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
