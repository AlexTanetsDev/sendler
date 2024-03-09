"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

import { validationSchemaCreateClient } from "@/models/forms";
import GreenButton from "../buttons/GreenButton";
import SelectTime from "../SelectTime";
import { createGroupClient, updateUserClient } from "@/fetch-actions/clientsFetchActions";
import { getTimeOptionsValues } from '@/helpers/getTimeOptionsValues';
import checkDate from "@/helpers/checkDate";

import { FormInputCreateClient, IClientDatabase } from "@/globaltypes/types";

interface Props {
	onClose: (() => void) | undefined;
	updateClients: () => void,
	getUpdate: () => void,
	openSelect: (isOpen: boolean) => void;
	title?: string;
	groupId?: number;
	groupName?: string;
	currentClient?: IClientDatabase;
};

const CreateClientForm = ({
	onClose,
	updateClients,
	getUpdate,
	openSelect,
	title,
	groupName,
	currentClient,
	groupId }: Props) => {

	const { data: session } = useSession();
	const userId = session?.user.user_id;
	const [isDisabled, setIsDisabled] = useState(false);
	const [day, setDay] = useState<string | undefined>(currentClient?.date_of_birth?.split('.')[0]);
	const [month, setMonth] = useState<string | undefined>(currentClient?.date_of_birth?.split('.')[1]);
	const [year, setYear] = useState<string | undefined>(currentClient?.date_of_birth?.split('.')[2]);
	const refForm = useRef<HTMLFormElement | null>(null);

	const getDay = (item: string | undefined) => {
		setDay(item);
	};

	const getMonth = (item: string | undefined) => {
		setMonth(item);
	};

	const getYear = (item: string | undefined) => {
		setYear(item);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormInputCreateClient>({
		resolver: async (data) => {
			try {
				await validationSchemaCreateClient.validateAsync(data, {
					abortEarly: false,
				});
				return { values: data, errors: {} };
			} catch (error: any) {
				const validationErrors: Record<string, { message: string }> = {};
				if (error.details) {
					error.details.forEach(
						(detail: { context: { key: string | number }; message: any }) => {
							if (detail.context && detail.context.key) {
								validationErrors[detail.context.key] = {
									message: detail.message,
								};
							}
						}
					);
				}
				return {
					values: {},
					errors: validationErrors,
				};
			}
		},
	});

	const onSubmit: SubmitHandler<FormInputCreateClient> = async (data) => {
		let birthday: string | undefined;

		if (day && month && year) {
			birthday = `${year}.${month}.${day}`;
		};

		const clientData = {
			tel: `380${data.phone}`,
			last_name: data.lastName,
			first_name: data.firstName,
			middle_name: data.middleName,
			date_of_birth: birthday,
			parameter_1: data.parameter1,
			parameter_2: data.parameter2,
		};

		if (currentClient?.client_id) {
			updateUserClient(currentClient.client_id, clientData);
			updateClients();
			getUpdate();
		} else {
			createGroupClient(userId, groupId, clientData);
			updateClients();
			getUpdate();
		}
		reset();
		{
			onClose && onClose();
		}
		setIsDisabled(false);
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className="w-[526px] mx-auto pb-11 pt-[29px]  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg px-[26px]"
			ref={refForm}
		>
			{title && !groupName && <p className="form-title mb-8 mt-[15px]">{title}</p>}
			{title && groupName && <p className="form-title mb-8 mt-[15px]">{`${title} - ${groupName}`}</p>}
			<div className="text-left w-full mb-8">

				<label
					htmlFor="phone"
					className="font-roboto text-sm font-medium mb-2  mt-8 block"
				>
					Номер телефону
					<span className="ml-1 text-red-700">*</span>
				</label>
				<div className="flex relative">
					<span className="absolute left-3 top-[9px]">+380</span>
					<input
						id="phone"
						type="text"
						defaultValue={currentClient?.tel && (currentClient.tel).slice(3, (currentClient.tel).length)}
						{...register("phone")}
						className="w-full border py-2 pr-11 pl-[50px] focus:outline-none focus:border-blue-500 input"
						placeholder="675555544"
						maxLength={9}
						required
					/>
					{errors.phone && (
						<span className="form-errors">{errors.phone.message}</span>
					)}
				</div>


				<label
					htmlFor="lastName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Прізвище
				</label>
				<div className="flex relative">
					<input
						id="lastName"
						type="text"
						defaultValue={currentClient?.last_name && currentClient.last_name}
						{...register("lastName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Петренко"
					/>
					{errors.lastName && (
						<span className="form-errors">{errors.lastName.message}</span>
					)}
				</div>

				<label
					htmlFor="firstName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Ім&apos;я
				</label>
				<div className="flex relative">
					<input
						id="firstName"
						type="text"
						defaultValue={currentClient?.first_name && currentClient.first_name}
						{...register("firstName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Петро"
					/>
					{errors.firstName && (
						<span className="form-errors">{errors.firstName.message}</span>
					)}
				</div>

				<label
					htmlFor="midleName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					По-батькові
				</label>
				<div className="flex relative">
					<input
						id="middleName"
						type="text"
						defaultValue={currentClient?.middle_name && currentClient.middle_name}
						{...register("middleName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Олександрович"
					/>
					{errors.middleName && (
						<span className="form-errors">{errors.middleName.message}</span>
					)}
				</div>

				<label
					htmlFor="day"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Дата народження
				</label>
				<div className="flex gap-x-3 justify-center">
					<SelectTime openSelect={openSelect} isModal={true} selectOptions={getTimeOptionsValues(1, 31)} getSelect={getDay} selectedOption={day} widthValue={118} startValue='' />
					<SelectTime openSelect={openSelect} isModal={true} selectOptions={getTimeOptionsValues(1, 12)} getSelect={getMonth} selectedOption={month} widthValue={130} startValue='' />
					<SelectTime openSelect={openSelect} isModal={true} selectOptions={getTimeOptionsValues(1900, new Date().getFullYear())} getSelect={getYear} selectedOption={year} widthValue={198} startValue='' />
				</div>

				<label
					htmlFor="parameter1"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Параметр 1
				</label>
				<div className="flex">
					<input
						id="parameter1"
						type="text"
						defaultValue={currentClient?.parameter_1 && currentClient.parameter_1}
						{...register("parameter1")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
					/>
					{errors.parameter1 && (
						<span className="form-errors">{errors.parameter1.message}</span>
					)}
				</div>

				<label
					htmlFor="parameter2"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Параметр 2
				</label>
				<div className="flex">
					<input
						id="parameter2"
						type="text"
						defaultValue={currentClient?.parameter_2 && currentClient.parameter_2}
						{...register("parameter2")}
						className="input block w-full border py-2 px-3 focus:outline-none focus:border-blue-500"
					/>
					{errors.parameter2 && (
						<span className="form-errors">{errors.parameter2.message}</span>
					)}
				</div>
			</div>
			<GreenButton size="big" isDisabled={isDisabled}>Зберегти</GreenButton>
		</form>
	);
};

export { CreateClientForm };
