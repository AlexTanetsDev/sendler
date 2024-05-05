'use client';

import { ISession, IUser } from '@/globaltypes/types';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { getUser } from '@/fetch-actions/usersFetchActions';


export default function UserSmsInform({ session }: { session: ISession | Session | null }) {

	const userId = session?.user.user_id;
	const [user, setUser] = useState<IUser>();
	const [socket, setSocket] = useState<any>(undefined);
	const message = userId;
	const roomName = userId;
	let NEXT_PUBLIC_SOCKET_URL: string;

	if (process.env.NEXT_PUBLIC_SOCKET_URL) {
		NEXT_PUBLIC_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
	} else {
		NEXT_PUBLIC_SOCKET_URL = "http://localhost:1080";
	};

	useEffect(() => {

		const getData = async () => {
			if (userId) {
				const res = await getUser(userId);
				if (res) {
					setUser(res.data.user);
				};
			};
		};

		const handleSendMessage = () => {
			socket.emit("message", message, roomName);
		};
		const socket = io(NEXT_PUBLIC_SOCKET_URL);

		getData();
		setSocket(socket);
		handleSendMessage();
		socket.on("message", (user) => {
			if (user) {
				setUser(user);
			};
		});
	}, [userId, message, roomName, NEXT_PUBLIC_SOCKET_URL, user?.balance]);

	return (
		<div className="flex justify-end mb-[50px]">
			<div className="flex flex-row justify-center items-center px-[35px] py-[14px] text-2xl rounded-[18px] bg-formBg">
				<div className='min-w-[100px] mr-1'>{user?.user_login}</div>
				<div className='mr-2'>:</div>
				<div className='min-w-[40px] text-end mr-2'>{user?.balance}</div>
				<div>SMS</div>
			</div>
		</div>
	);
};
