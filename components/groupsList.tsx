'use client';

import { redirect } from "next/navigation";

import { IGroupDatabase } from "@/globaltypes/types";

type Props = {
	groups: IGroupDatabase[] | undefined;
}

export default function GroupsList({ groups }: Props) {

	if (groups === undefined) {
		console.log('Unable to fetch userGroups!');
		redirect('/')
	};

	return (
		<div className="mb-[80px]">
			<div className='flex w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable'>
				<p className='mr-[109px]'>Група</p>
				<p className='mr-[150px]'>Оновлення</p>
				<p>Кількість</p>
			</div>
			<ul>
				{groups.map((userGroup: IGroupDatabase) => (
					<li key={userGroup.group_id} className="flex py-3.5 text-xl font-montserrat font-normal border-b border-rowUnderLine">
						<div className="w-32 mx-8 text-left">{userGroup.group_name}</div>
						<div className="w-[200px] mr-12 text-left">{userGroup.group_create_date}</div>
						<div className="w-16 mr-36 text-left">{userGroup.number_members}</div>
						<button className="row-table__btn mr-[15px]">Редагувати</button>
						<button className="row-table__btn mr-[15px]">Видалити</button>
						<button className="row-table__btn mr-[15px]">Імпорт</button>
						<button className="row-table__btn mr-[15px]">Експорт</button>
					</li>
				))}
			</ul>
		</div>
	)
}

