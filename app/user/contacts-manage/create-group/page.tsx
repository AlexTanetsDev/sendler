import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

import UserSmsBalansInform from '@/components/UserSmsBalansInform';

export default async function CreateGroupPage() {
	const session = await getServerSession(options);

	return (
		<main className='container mx-auto'>
			<UserSmsBalansInform session={session} />
			<h1 className='page-title mb-14'>Управління контактами</h1>
			<div className='w-full h-96 px-8 py-14 rounded-2xl bg-gray-400'>
				<p className='text-2xl font-medium'>Створення групи</p>
			</div>
		</main>
	)
}

