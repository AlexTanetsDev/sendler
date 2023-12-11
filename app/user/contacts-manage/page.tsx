import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

import UserSmsBalansInform from '@/components/UserSmsBalansInform';

export default async function ContactManagmentPage() {
	const session = await getServerSession(options);

	return (
		<main className='container mx-auto'>
			<UserSmsBalansInform session={session} />
			<h1 className='page-title mb-14'>Управління контактами</h1>
			<div className='w-full py-14 rounded-2xl bg-formBg'>
				<p className='w-1/2 mb-8 ml-8 text-lg font-normal font-roboto'>Для початку роботи Вам потрібно створити нову Групу контактів та додати до неї номери. Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.</p>
				<form className='w-7/12 mb-14 ml-8'>
					<label htmlFor='groupName' className='block mb-3.5 text-2xl font-roboto font-normal'>
						Назва групи
					</label>
					<div className='flex items-center'>
						<input type='text' name='groupName' autoFocus className='h-12 mr-8 grow input-style'></input>
						<button type="submit" className='transparent-btn'>Створити</button>
					</div>
				</form>
				<div className='flex w-full px-6 pt-4 pb-3 text-xl font-roboto font-normal bg-headerTable rounded-2xl'>
					<p className='mr-28'>Група</p>
					<p className='mr-24'>Оновлення</p>
					<p>Кількість</p>
				</div>
			</div>
		</main>
	)
};

