import { getServerSession } from "next-auth";
import Image from "next/image";

import { options } from "@/app/api/auth/[...nextauth]/options";

import PaymentsList from "@/components/PaymentsList";
import Title from "@/components/Title";

import { ISession } from "@/globaltypes/types";

export default async function UserAccountPage({ params }: { params: { userId: string } }) {
	const session: ISession | null = await getServerSession(options);
	const balance = session?.user.balance;

	return (
		<>
			<Title type='h1' color="dark">Особистий кабінет</Title>
			<div className='content-block mb-20 mt-[53px]'>
				<div className='flex flex-col gap-8 mb-16'>
					<div className='flex'>
						<div className='w-52 mr-8'>Баланс на рахунку</div>
						<div className='text-xl font-montserrat font-normal'>{balance} SMS</div>
					</div>
					<div className='flex'>
						<div className='w-52 mr-8'>Всього відправлено</div>
						<div className='text-xl font-montserrat font-normal'>{balance} SMS</div>
					</div>
					<div className='flex'>
						<div className='w-52 mr-8'>Усього доставлено</div>
						<div className='text-xl font-montserrat font-normal'>{balance} SMS</div>
					</div>
				</div>
				<Title type="h3" color="dark">Поповнити рахунок</Title>
				<p className="my-8">Введіть бажану суму для оплати або потрібну кількість SMS</p>
				<div className="flex items-center mb-20">
					<div className="relative">
						<input className="input w-48 h-12 mr-5" />
						<p className="absolute -bottom-6 left-0 text-xs font-montserrat font-normal mr-56">Сума</p>
					</div>
					<Image
						src="/svg/vector.svg"
						alt="vector"
						width={32}
						height={32}
						className="block mr-5" />
					<div className="relative">
						<input className="input w-48 h-12 mr-8" />
						<p className="absolute -bottom-6 left-0 text-xs font-montserrat font-normal">Кількість</p>
					</div>
					<span>Сформувати рахунок (ПриватБанк)</span>
				</div>
				<p className="w-3/4 text-xl font-roboto font-normal">Якщо Ви працюєте з ТОВ `&quot;`Інноваційні медіа рішення `&quot;` за договором як Юридична особа, то для виставлення рахунку Вам потрібно зв`&apos;`язатися з нами або зателефонувати нам за номером (097) 678-12-59.</p>
			</div>
			<div className='content-block mb-20'>
				<Title type="h3" color="dark">Історія платежів</Title>
				<PaymentsList />
			</div>
			<div className="inputs-box text-center">
				<Title type="h2" color="dark">Анкета користувача</Title>
				<form className="w-full mt-8">
					<label htmlFor="login" className="input__lable block mb-2">Логин*</label>
					<input name="login" className="input block w-full h-12 mb-8" />
					<label htmlFor="password" className="input__lable block mb-2">Пароль*</label>
					<input name="password" className="input block w-full h-12 mb-8" />
					<label htmlFor="new-password" className="input__lable block mb-2">Новий пароль*</label>
					<input name="new-password" className="input block w-full h-12 mb-8" />
					<label htmlFor="contact-person" className="input__lable block mb-2">Контактна особа*</label>
					<input name="contact-person" className="input block w-full h-12 mb-8" />
					<label htmlFor="tel" className="input__lable block mb-2">Телефон для зв`&apos;`язку*</label>
					<input name="tel" className="input block w-full h-12 mb-8" />
					<label htmlFor="email" className="input__lable block mb-2">Електронна пошта*</label>
					<input name="email" className="input block w-full h-12 mb-8" />
					<button className="submit__btn block w-56 mx-auto">Зберегти</button>
				</form>
			</div>
		</>
	)
}
