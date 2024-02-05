import { ISession } from '@/globaltypes/types';
import { Session } from 'next-auth';

export default function UserSmsInform({ session }: { session: ISession | Session | null }) {
	const userName = session?.user.user_name;
	const userBalance = session?.user.balance;

	return (
		<div className="flex justify-end mb-[50px]">
			<div className="flex flex-row justify-center items-center px-[35px] py-[14px] text-2xl rounded-[18px] bg-formBg">
				{userName}: {userBalance} SMS
			</div>
		</div>
	);
}
