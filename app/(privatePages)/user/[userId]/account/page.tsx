// 'use client';

// import { useEffect, useState } from 'react';
// import { io } from "socket.io-client";

// import PaymentsList from "@/components/PaymentsList";
// import Title from "@/components/Title";

// import { UpdateUserForm } from "@/components/forms/UpdateUserForm";
// import CreateAccount from "@/components/CreateAccount";
// import { useSession } from 'next-auth/react';

// export default function UserAccountPage() {
// 	const { data: session } = useSession();
// 	const userLogin = session?.user.user_login;
// 	const userBalance = session?.user.balance;
// 	const userId = session?.user.user_id;
// 	const [socket, setSocket] = useState<any>(undefined);
// 	const [message, setMessage] = useState(userId);
// 	const [roomName, setRoomName] = useState(userLogin);
// 	const [balance, setBalance] = useState(userBalance);
// 	const [login, setLogin] = useState(userLogin);
// 	const [deliveredSms, setDeliveredSms] = useState(0);
// 	const [sentSms, setSentSms] = useState(0);

// 	console.log('SESSION', session?.user)

// 	console.log('userId', userId)

// 	useEffect(() => {
// 		const handleSendMessage = () => {
// 			socket.emit("message", message, roomName);
// 		};
// 		const socket = io("http://localhost:3001");
// 		setSocket(socket);
// 		setMessage(userId);
// 		setRoomName(userLogin);
// 		handleSendMessage();
// 		socket.on("message", (user) => {
// 			console.log('USER', user);
// 			console.log('BALANCE PAGE', user.balance);
// 			setBalance(user.balance);
// 			setLogin(user.user_login);
// 			setDeliveredSms(user.delivered_sms);
// 			setSentSms(user.sent_sms);
// 		})
// 	}, [userId, userLogin, message, roomName]);

// 	return (
// 		<>
// 			<Title type='h2' color="dark">Особистий кабінет</Title>
// 			<div className='content-block mb-20 mt-[50px] pl-[26px]'>
// 				<Title type="accent-main_text" color="dark">Кількість СМС</Title>
// 				<div className='flex flex-col gap-8 mt-10'>
// 					<div className='flex'>
// 						<div className='w-52 mr-8'>Баланс на рахунку</div>
// 						<div className='text-xl font-montserrat font-normal'>{balance} SMS</div>
// 					</div>
// 					<div className='flex'>
// 						<div className='w-52 mr-8'>Всього відправлено</div>
// 						<div className='text-xl font-montserrat font-normal'>{sentSms} SMS</div>
// 					</div>
// 					<div className='flex'>
// 						<div className='w-52 mr-8'>Усього доставлено</div>
// 						<div className='text-xl font-montserrat font-normal'>{deliveredSms} SMS</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div className='content-block mb-20 pl-[26px]'>
// 				<Title type="accent-main_text" color="dark">Поповнити рахунок</Title>
// 				<p className="mt-10 mb-3">Введіть потрібну кількість SMS</p>
// 				<CreateAccount />
// 				<p className="w-[906px] text-xl accent-main_text">Якщо Ви працюєте з ТОВ &quot;Інноваційні медіа рішення&quot; за договором як Юридична особа, то для виставлення рахунку Вам потрібно зв&apos;язатися з нами або зателефонувати нам за номером (097) 678-12-59.</p>
// 			</div>
// 			<div className='content-block mb-20'>
// 				<div className="pl-[26px]">
// 					<Title type="accent-main_text" color="dark">Історія платежів</Title>
// 				</div>
// 				{userId && <PaymentsList userId={userId} />}
// 			</div>
// 			<UpdateUserForm userId={userId} />
// 		</>
// 	)
// };

import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

import PaymentsList from "@/components/PaymentsList";
import Title from "@/components/Title";

import { ISession } from "@/globaltypes/types";
import { UpdateUserForm } from "@/components/forms/UpdateUserForm";
import CreateAccount from "@/components/CreateAccount";
import { fetchUserDeliveredSms, fetchUserPaidSms, fetchUserSentSms } from "@/api-actions";

export default async function UserAccountPage() {
	const session: ISession | null = await getServerSession(options);
	const userId = session?.user.user_id;
	let sentSms;
	let deliveredSms;
	let balance;
	let paidSms;

	if (userId) {
		paidSms = await fetchUserPaidSms(userId);
		sentSms = await fetchUserSentSms(userId);
		deliveredSms = await fetchUserDeliveredSms(userId);
		if (paidSms === null || paidSms === undefined) {
			paidSms = 0;
		};
		if (deliveredSms === null || deliveredSms === undefined) {
			deliveredSms = 0;
		};
		balance = paidSms - deliveredSms;
	};

	return (
		<>
			<Title type='h2' color="dark">Особистий кабінет</Title>
			<div className='content-block mb-20 mt-[50px] pl-[26px]'>
				<Title type="accent-main_text" color="dark">Кількість СМС</Title>
				<div className='flex flex-col gap-8 mt-10'>
					<div className='flex'>
						<div className='w-52 mr-8'>Баланс на рахунку</div>
						<div className='text-xl font-montserrat font-normal'>{balance} SMS</div>
					</div>
					<div className='flex'>
						<div className='w-52 mr-8'>Всього відправлено</div>
						<div className='text-xl font-montserrat font-normal'>{sentSms} SMS</div>
					</div>
					<div className='flex'>
						<div className='w-52 mr-8'>Усього доставлено</div>
						<div className='text-xl font-montserrat font-normal'>{deliveredSms} SMS</div>
					</div>
				</div>
			</div>
			<div className='content-block mb-20 pl-[26px]'>
				<Title type="accent-main_text" color="dark">Поповнити рахунок</Title>
				<p className="mt-10 mb-3">Введіть потрібну кількість SMS</p>
				<CreateAccount />
				<p className="w-[906px] text-xl accent-main_text">Якщо Ви працюєте з ТОВ &quot;Інноваційні медіа рішення&quot; за договором як Юридична особа, то для виставлення рахунку Вам потрібно зв&apos;язатися з нами або зателефонувати нам за номером (097) 678-12-59.</p>
			</div>
			<div className='content-block mb-20'>
				<div className="pl-[26px]">
					<Title type="accent-main_text" color="dark">Історія платежів</Title>
				</div>
				{userId && <PaymentsList userId={userId} />}
			</div>
			<UpdateUserForm userId={userId} />
		</>
	)
}
