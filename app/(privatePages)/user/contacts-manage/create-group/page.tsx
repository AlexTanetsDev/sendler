import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

import UserSmsBalansInform from '@/components/UserSmsBalansInform';
import Title from "@/components/Title";

import { ISession } from "@/globaltypes/types";

export default async function CreateGroupPage() {
	const session: ISession | null = await getServerSession(options);

	return (
		<section className='container mx-auto'>
			<UserSmsBalansInform session={session} />
			<Title type="h1" color="dark">Управління контактами</Title>
			<div className='content-block mt-[53px]'>
				<Title type="h2" color="dark">Створення групи</Title>
			</div>
		</section>
	)
}