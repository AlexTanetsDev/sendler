'use client';

import { ISession } from '@/globaltypes/types';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

export default function UserSmsInform({ session }: { session: ISession | Session | null }) {
	const userLogin = session?.user.user_login;
	const userBalance = session?.user.balance;
	const [socket, setSocket] = useState<any>(undefined);

	useEffect(() => {
		const socket = io("http://localhost:3001");
		setSocket(socket);
		console.log('socket', socket)
	}, []);

	return (
		<div className="flex justify-end mb-[50px]">
			<div className="flex flex-row justify-center items-center px-[35px] py-[14px] text-2xl rounded-[18px] bg-formBg">
				{userLogin}: {userBalance} SMS
			</div>
		</div>
	);
}
