import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { options } from "@/app/api/auth/[...nextauth]/options";

import UserSmsBalansInform from '@/components/UserSmsBalansInform';
import GroupsList from "@/components/groupsList";

import { ISession } from "@/globaltypes/types";


export default async function ContactManagmentPage() {
	const session: ISession | null = await getServerSession(options);
	const userId = session?.user.user_id;

	if (!userId) {
		console.log("Unable fetch userId!")
		redirect('/');
	}


	return (
		<section className='container mx-auto'>
			<UserSmsBalansInform session={session} />
			<h1 className='page-title mb-14'>Управління контактами</h1>
			<div className='content-block'>
				<p className='w-1/2 mb-8 ml-8 text-lg font-normal font-roboto'>Для початку роботи Вам потрібно створити нову Групу контактів та додати до неї номери. Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.</p>
				<form className='w-7/12 mb-14 ml-8'>
					<label htmlFor='groupName' className='block mb-3.5 input__title'>
						Назва групи
					</label>
					<div className='flex items-center'>
						<input type='text' name='groupName' className='h-12 mr-8 grow input'></input>
						<button type="submit" className='action__btn'>Створити</button>
					</div>
				</form>
				<GroupsList id={userId} />
			</div>
		</section>
	)
};