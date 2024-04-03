'use client';

import { ISession } from '@/globaltypes/types';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

export default function UserSmsInform({ session }: { session: ISession | Session | null }) {
	const userLogin = session?.user.user_login;
	const userBalance = session?.user.balance;
	const userId = session?.user.user_id;
	const [socket, setSocket] = useState<any>(undefined);
	const [message, setMessage] = useState(userId);
	const [roomName, setRoomName] = useState(userLogin);
	const [balance, setBalance] = useState(userBalance);
	const [login, setLogin] = useState(userLogin);


	// useEffect(() => {
	// 	const handleSendMessage = () => {
	// 		socket.emit("message", message, roomName);
	// 	};
	// 	const socket = io("http://localhost:3001");
	// 	setSocket(socket);
	// 	setMessage(userId);
	// 	setRoomName(userLogin);
	// 	handleSendMessage();
	// 	socket.on("message", (user) => {
	// 		if (user) {
	// 			// console.log('USER', user);
	// 			console.log('BALANCE COMPONENT', user.balance);
	// 			setBalance(user.balance);
	// 			setLogin(user.user_login);
	// 		};
	// 	})
	// }, [userId, userLogin, message, roomName]);

	return (
		<div className="flex justify-end mb-[50px]">
			<div className="flex flex-row justify-center items-center px-[35px] py-[14px] text-2xl rounded-[18px] bg-formBg">
				{login}: {balance} SMS
			</div>
		</div>
	);
};
