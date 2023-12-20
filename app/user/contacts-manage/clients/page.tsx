import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

import UserSmsBalansInform from '@/components/UserSmsBalansInform';
import { ISession } from "@/globaltypes/types";

export default async function ContactManagmentPage() {
	const session: ISession | null = await getServerSession(options);

	return (
		<section className='container mx-auto'>
			<UserSmsBalansInform session={session} />
			<h1 className='page-title mb-14'>Управління контактами</h1>
			<div className='w-2/5 h-96 p-6 rounded-2xl bg-formBg'>
				<p className='text-2xl text-center font-medium block'>Редагування групи</p>
				<div className="flex justify-between">
					<button type="submit" className='grey-btn w-1/2 mr-3'>Пошук</button>
					<button type="submit" className='grey-btn w-1/2'>Зберегти</button>
				</div>

			</div>
		</section>
	)
};
