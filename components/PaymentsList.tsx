import { redirect } from "next/navigation";

import { getUserGroups } from "@/app/utils";

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
		<>
			<div className='flex w-full mt-[60px] px-6 pt-4 pb-3 text-xl font-roboto font-normal bg-headerTable rounded-2xl'>
				<p className='mr-28'>Дата поповнення</p>
				<p className='mr-24'>Сума, грн</p>
				<p>Кількість</p>
			</div>
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
		</>
	)
}