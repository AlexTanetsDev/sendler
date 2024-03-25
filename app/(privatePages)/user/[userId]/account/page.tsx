import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

import PaymentsList from "@/components/PaymentsList";
import Title from "@/components/Title";

import { ISession } from "@/globaltypes/types";
import { UpdateUserForm } from "@/components/forms/UpdateUserForm";
import CreateAccount from "@/components/CreateAccount";
import fetchQuantitySentSms from "@/api-actions/fetchQuantitySentSms";
import fetchQuantityDeliveredSms from "@/api-actions/fetchQuantityDeliveredSms"

export default async function UserAccountPage() {
	const session: ISession | null = await getServerSession(options);
	const balance = session?.user.balance;
	const userId = session?.user.user_id;
	let sentSms;
	let deliveredSms;

	if (userId) {
		sentSms = await fetchQuantitySentSms(userId);
		deliveredSms = await fetchQuantityDeliveredSms(userId);
	};

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
						<div className='text-xl font-montserrat font-normal'>{sentSms} SMS</div>
					</div>
					<div className='flex'>
						<div className='w-52 mr-8'>Усього доставлено</div>
						<div className='text-xl font-montserrat font-normal'>{deliveredSms} SMS</div>
					</div>
				</div>
			</div>
			<div className='content-block mb-20 pl-[26px]'>
				<Title type="accent-main_text" color="dark">Поповнити рахунок</Title>
				<p className="mt-10 mb-3">Введіть потрібну кількість SMS</p>
				<CreateAccount />
				<p className="w-[906px] text-xl accent-main_text">Якщо Ви працюєте з ТОВ &quot;Інноваційні медіа рішення&quot; за договором як Юридична особа, то для виставлення рахунку Вам потрібно зв&apos;язатися з нами або зателефонувати нам за номером (097) 678-12-59.</p>
			</div>
			<div className='content-block mb-20'>
				<div className="pl-[26px]">
					<Title type="accent-main_text" color="dark">Історія платежів</Title>
				</div>
				{userId && <PaymentsList userId={userId} />}
			</div>
			<UpdateUserForm userId={userId} />
		</>
	)
}
