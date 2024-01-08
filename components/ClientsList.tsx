"use client";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

import { useForm } from "react-hook-form";
import { useState } from "react";

import convertClientsBirthdayFormat from "@/helpers/ConvertClientsBirsdayFormat";

import { IClientDatabase, IGroupId } from "@/globaltypes/types";
import GreenButton from "./buttons/GreenButton";
import AddClient from "./Addclient";
import EditClient from "./EditClient";

type Props = {
	filteredClients: IClientDatabase[];
	groupId?: IGroupId | undefined;
	groupName?: string;
	deleteClients: (groupId: IGroupId | undefined, clientsId: number[]) => Promise<void>;
}

export default function ClientsList({
	filteredClients,
	groupId,
	groupName,
	deleteClients
}: Props) {

	const [isSelected, setIsSelected] = useState(0);

	const convertClients = convertClientsBirthdayFormat(filteredClients);

	const { register, handleSubmit } = useForm();

	const onSelect = (e: any) => {
		const { checked } = e.target;
		if (checked) {
			setIsSelected(isSelected + 1);
		} else {
			setIsSelected(isSelected - 1);
		}
	}

	const onSubmit = (data: any) => {
		const deletedClientsId: number[] = [];

		for (const key in data) {
			if (data[key] === true) {
				deletedClientsId.push(Number(key));
			}
		}

		deleteClients(groupId, deletedClientsId);
		setIsSelected(0);
	};

	return (
		<div className="mb-[80px]">
			<div className="flex gap-x-8 w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable">
				<p className="w-[158px] pl-[38px]">Номер</p>
				<p className="w-[346px]">Ім&apos;я(П.І.Б.)</p>
				<p className="w-[170px]">Дата народження</p>
				<p className="w-[150px]">Параметр 1</p>
				<p>Параметр 2</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="text-right">
				<ul>
					{convertClients[0] ? convertClients.map((convertClient) => (
						<li
							key={convertClient.client_id}
							className="flex  px-[26px] items-center h-[48px] text-base font-montserrat font-normal border-b border-rowUnderLine"
						>
							<input
								{...register(`${convertClient.client_id}`)}
								placeholder="bluebill1049@hotmail.com"
								type="checkbox"
								onChange={onSelect}
								className="mr-6"
							/>
							<div className="flex items-center gap-x-8">
								<div className="w-[120px] text-left overflow-hidden">
									{convertClient.tel}
								</div>
								<div className="flex gap-x-2 flex-nowrap w-[346px] text-left overflow-hidden">
									<div>{convertClient.last_name}</div>
									<div>{convertClient.first_name}</div>
									<div>{convertClient.middle_name}</div>
								</div>
								<div className="w-[170px] text-left overflow-hidden">
									{convertClient.ua_date_of_birth}
								</div>
								<div className="w-[150px] text-left overflow-hidden">
									{convertClient.parameter_1}
								</div>
								<div className="w-[150px] text-left overflow-hidden">
									{convertClient.parameter_2}
								</div>
								<EditClient groupName={groupName} client={convertClient} />
							</div>
						</li>
					))
						:
						<>
							<div className="flex  px-[26px] items-center h-[48px]  text-base font-montserrat font-normal border-b border-rowUnderLine">
								<span>1</span>
							</div>
							<div className="h-[48px] border-b border-rowUnderLine"></div>
							<div className="h-[48px] border-b border-rowUnderLine"></div>
						</>
					}
				</ul>
				<div className="flex mr-[26px] pt-[50px] justify-end">
					<div className="flex mr-[26px] justify-end">{groupId && <AddClient groupName={groupName} />}</div>
					<GreenButton isDisabled={convertClients[0] && isSelected ? false : true} size="big">Видалити</GreenButton>
				</div>
			</form>

		</div>
	);
}
