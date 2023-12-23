import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { options } from "@/app/api/auth/[...nextauth]/options";

import UserSmsBalansInform from '@/components/UserSmsBalansInform';
import GroupsList from "@/components/groupsList";
import CreateGroupForm from "@/components/forms/CreateGroupForm";
import { getUserGroups } from "@/app/utils";

import { ISession, IGroupDatabase } from "@/globaltypes/types";
import Title from "@/components/Title";


export default async function ContactManagmentPage() {
	const session: ISession | null = await getServerSession(options);

	const userId = session?.user.user_id;

	const userGroups: IGroupDatabase[] | undefined = await getUserGroups(userId);

	if (!userId) {
		console.log("Unable fetch userId!")
		redirect('/');
	}

	return (
		<section className='container mx-auto'>
			<UserSmsBalansInform session={session} />
			<Title type="h1" color="dark">Управління контактами</Title>
			<div className='content-block mt-[53px]'>
				<p className='w-1/2 mb-8 ml-8 text-lg font-normal font-roboto'>Для початку роботи Вам потрібно створити нову Групу контактів та додати до неї номери. Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.</p>
				<CreateGroupForm id={userId} />
				<GroupsList groups={userGroups} />
			</div>
		</section>
	)
};

