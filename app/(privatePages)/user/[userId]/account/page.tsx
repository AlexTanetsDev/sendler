import { getServerSession } from "next-auth";
import Image from "next/image";

import { options } from "@/app/api/auth/[...nextauth]/options";

import PaymentsList from "@/components/PaymentsList";
import Title from "@/components/Title";

import { ISession } from "@/globaltypes/types";
import { UpdateUserForm } from "@/components/forms/UpdateUserForm";

export default async function UserAccountPage() {
	const session: ISession | null = await getServerSession(options);
	const balance = session?.user.balance;
	const userId = session?.user.user_id;

	return (
		<>
			<Title type='h2' color="dark">Особистий кабінет</Title>
			<div className='content-block mb-20 mt-[50px] pl-[26px]'>
				<Title type="accent-main_text" color="dark">Кількість СМС</Title>
				<div className='flex flex-col gap-8 mt-10'>
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
			</div>
			<div className='content-block mb-20 pl-[26px]'>
				<Title type="accent-main_text" color="dark">Поповнити рахунок</Title>
				<p className="mt-10 mb-3">Введіть бажану суму для оплати або потрібну кількість SMS</p>
				<div className="flex items-center mb-[74px]">
					<div className="relative flex items-center mr-8">
						<div className="relative">
							<input className="input w-[196px] h-12 mr-[76px]" />
							<p className="absolute -bottom-6 left-0 text-xs font-montserrat font-normal mr-56">Сума</p>
						</div>
						<Image
							src="/svg/vector.svg"
							alt="vector"
							width={32}
							height={32}
							className="absolute top-1/2 left-1/2 block mr-5 translate-y-[-50%] translate-x-[-50%]" />
						<div className="relative">
							<input className="input w-[196px] h-12" />
							<p className="absolute -bottom-6 left-0 text-xs font-montserrat font-normal">Кількість</p>
						</div>
					</div>
					<span>Сформувати рахунок (ПриватБанк)</span>
				</div>
				<p className="w-3/4 text-xl accent-main_text">Якщо Ви працюєте з ТОВ `&quot;`Інноваційні медіа рішення `&quot;` за договором як Юридична особа, то для виставлення рахунку Вам потрібно зв`&apos;`язатися з нами або зателефонувати нам за номером (097) 678-12-59.</p>
			</div>
			<div className='content-block mb-20'>
				<div className="pl-[26px]">
					<Title type="accent-main_text" color="dark">Історія платежів</Title>
				</div>
				<PaymentsList />
			</div>
			<UpdateUserForm userId={userId} />
		</>
	)
}
