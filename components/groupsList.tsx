'use client';

import { redirect } from "next/navigation";

import { IGroupDatabase } from "@/globaltypes/types";
import DeleteGroupBtn from "./buttons/DeleteGroupBtn";
import EditGroupBtn from "./buttons/EditGroupBtn";
import ImportGroupBtn from "./buttons/ImportGroupBTN";

type Props = {
	groups: IGroupDatabase[] | undefined;
	updateListControl: any;
}

export default function GroupsList({ groups, updateListControl }: Props) {

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
				{groups.map((group: IGroupDatabase) => (
					<li key={group.group_id} className="flex py-3.5 text-xl font-montserrat font-normal border-b border-rowUnderLine">
						<div className="w-32 mx-8 text-left">{group.group_name}</div>
						<div className="w-[200px] mr-12 text-left">{group.group_create_date}</div>
						<div className="w-16 mr-36 text-left">{group.number_members}</div>
						<EditGroupBtn id={group.group_id} >Редагувати</EditGroupBtn>
						<DeleteGroupBtn id={group.group_id} updateListControl={updateListControl}>Видалити</DeleteGroupBtn>
						<ImportGroupBtn id={group.group_id}>Імпорт</ImportGroupBtn>
						<button className="row-table__btn mr-[15px]">Експорт</button>
					</li>
				))}
			</ul>
		</div>
	)
}

