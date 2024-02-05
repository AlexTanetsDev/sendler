import { redirect } from "next/navigation";

// import { getUserGroups } from '@/api-actions/getUserGroups';

import { IGroupDatabase } from "@/globaltypes/types";

type Props = {
	id: number | undefined;
}

export default async function PaymentsList() {

	// const userGroups: IGroupDatabase[] | undefined = await getUserGroups(id);

	// if (userGroups === undefined) {
	// 	console.log('Unable to fetch userGroups!');
	// 	redirect('/')
	// };

	return (
		<div className="mt-10">
			<div className='flex w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable'>
				<p className='mr-28'>Дата поповнення</p>
				<p className='mr-24'>Сума, грн</p>
				<p>Кількість</p>
			</div>
			<div className="flex  px-[26px] items-center h-[58px]  text-base font-montserrat font-normal border-b border-rowUnderLine">
				<span>1</span>
			</div>
			<div className="h-[48px] border-b border-rowUnderLine"></div>
			<div className="h-[48px] border-b border-rowUnderLine"></div>
			{/* <ul>
				{userGroups.map((userGroup: IGroupDatabase) => (
					<li key={userGroup.user_id}>
						<div className="flex py-3.5 text-xl font-montserrat font-normal">
							<div className="w-32 mx-8">{userGroup.group_name}</div>
							<div className="w-36 mr-12">{userGroup.group_id}</div>
							<div className="w-32 mr-8">{userGroup.user_id}</div>
							<button className="row-table__btn mr-4">Редагувати</button>
							<button className="row-table__btn mr-4">Видалити</button>
							<button className="row-table__btn mr-4">Експорт</button>
						</div>
						<div className="border-b border-black"></div>
					</li>
				))}
			</ul> */}
		</div>
	)
}