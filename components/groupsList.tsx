'use client';

import { IGroupDatabase } from "@/globaltypes/types";
import DeleteGroupBtn from "./buttons/DeleteGroupBtn";
import EditGroupBtn from "./buttons/EditGroupBtn";
import ImportGroupBtn from "./buttons/ImportGroupBTN";
import ExportGroupBtn from "./buttons/ExportGroupBtn";

type Props = {
	groups?: IGroupDatabase[];
	getGroups: () => void,
}

export default function GroupsList({ groups, getGroups }: Props) {

	return (
		<div className="mb-[80px]">
			<div className='flex w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable'>
				<p className='w-[110px] mr-[60px]'>Група</p>
				<p className='w-[186px] mr-[91px]'>Оновлення</p>
				<p>Кількість</p>
			</div>
			<ul>
				{groups?.length ? groups?.map((group: IGroupDatabase) => (
					<li key={group.group_id} className="flex  px-[26px] items-center h-[58px]  text-base font-montserrat font-normal border-b border-rowUnderLine">
						<div className="w-[120px] mr-[50px] text-left overflow-hidden">{group.group_name}</div>
						<div className="w-[186px] mr-[91px] text-left">{group.group_create_date}</div>
						<div className="w-[100px] mr-[91px] text-left">{group.number_members}</div>
						<div className="flex gap-x-[15px]">
							<EditGroupBtn id={group.group_id} >Редагувати</EditGroupBtn>
							<DeleteGroupBtn id={group.group_id} getGroups={getGroups}>Видалити</DeleteGroupBtn>
							<ImportGroupBtn id={group.group_id}>Імпорт</ImportGroupBtn>
							<ExportGroupBtn id={group.group_id} group={group}>Експорт</ExportGroupBtn>
						</div>
					</li>
				)) :
					<>
						<div className="flex  px-[26px] items-center h-[58px]  text-base font-montserrat font-normal border-b border-rowUnderLine">
							<span>1</span>
						</div>
						<div className="h-[48px] border-b border-rowUnderLine"></div>
						<div className="h-[48px] border-b border-rowUnderLine"></div>
					</>
				}
			</ul>
		</div>
	)
}

