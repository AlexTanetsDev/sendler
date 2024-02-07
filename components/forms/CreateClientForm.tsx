"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { validationSchemaCreateClient } from "@/models/forms";
import { FormInputCreateClient, IClientDatabase } from "@/globaltypes/types";
import GreenButton from "../buttons/GreenButton";
import CreateOptions from "../CreateOptions";
import { createGroupClient, updateUserClient } from "@/fetch-actions/clientsFetchActions";

interface Props {
	onClose: (() => void) | undefined;
	updateClients: () => void,
	getUpdate: () => void,
	title?: string;
	groupId?: number;
	groupName?: string;
	currentClient?: IClientDatabase;
};

const CreateClientForm = ({
	onClose,
	updateClients,
	getUpdate,
	title,
	groupName,
	currentClient,
	groupId }: Props) => {

	const { data: session } = useSession();
	const userId = session?.user.user_id;
	const [isDisabled, setIsDisabled] = useState(false);

	const day = Number(currentClient?.date_of_birth?.split('.')[0]);
	const month = Number(currentClient?.date_of_birth?.split('.')[1]);
	const year = Number(currentClient?.date_of_birth?.split('.')[2]);

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
		setIsDisabled(true);

		const clientData = {
			tel: `380${data.phone}`,
			last_name: data.lastName,
			first_name: data.firstName,
			middle_name: data.middleName,
			date_of_birth: `${data.year}.${data.month}.${data.day}`,
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
				<div className="flex gap-x-3">
					<div className="relative flex">
						<select
							id='day'
							{...register("day")}
							defaultValue={currentClient?.date_of_birth ? day : ''}
							className="input w-[118px] border py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500  hover:cursor-pointer">
							<CreateOptions min={1} max={31} />
						</select>
						<div className="select_arrow">
						</div>
					</div>

					<div className="relative flex">
						<select
							id='month'
							{...register("month")}
							defaultValue={currentClient?.date_of_birth ? month : ''}
							className="input w-[138px] border py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500  hover:cursor-pointer">
							<CreateOptions min={1} max={12} />
						</select>
						<div className="select_arrow">
						</div>
					</div>

					<div className="relative flex">
						<select
							id='year'
							{...register("year")}
							defaultValue={currentClient?.date_of_birth ? year : ''}
							className="input w-[194px] border py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500 hover:cursor-pointer">
							<CreateOptions min={1900} max={new Date().getFullYear()} />
						</select>
						<div className="select_arrow">
						</div>
					</div>
				</div>

				<label
					htmlFor="parameter1"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Параметр 1
				</label>
				<div className="flex relative">
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
				<div className="flex relative">
					<input
						id="parameter2"
						type="text"
						defaultValue={currentClient?.parameter_2 && currentClient.parameter_2}
						{...register("parameter2")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
					/>
					{errors.parameter2 && (
						<span className="form-errors">{errors.parameter2.message}</span>
					)}
				</div>
			</div>
			<GreenButton size="big" isDisabled={isDisabled}>Відправити</GreenButton>
		</form>
	);
};

export { CreateClientForm };