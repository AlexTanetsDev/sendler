"use client";

import axios from "axios";

import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

import { validationSchemaCreateClient } from "@/models/forms";
import { FormInputCreateClient, IClientDatabase } from "@/globaltypes/types";
import GreenButton from "../buttons/GreenButton";
import CreateOptions from "../CreateOptions";
import { useSession } from "next-auth/react";

interface Props {
	onClose: (() => void) | undefined;
	updateClients: () => void,
	getUpdate: () => void,
	title?: string;
	groupId?: number;
	groupName?: string;
	clientCurrent?: IClientDatabase;
};

const CreateClientForm = ({
	onClose,
	updateClients,
	getUpdate,
	title,
	groupName,
	clientCurrent,
	groupId }: Props) => {

	const { data: session } = useSession();
	const userId = session?.user.user_id;
	const day = Number(clientCurrent?.date_of_birth?.split('.')[0]);
	const month = Number(clientCurrent?.date_of_birth?.split('.')[1]);
	const year = Number(clientCurrent?.date_of_birth?.split('.')[2]);

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

		try {
			const clientData = {
				tel: data.phone,
				last_name: data.lastName,
				first_name: data.firstName,
				middle_name: data.middleName,
				date_of_birth: `${data.year}.${data.month}.${data.day}`,
				parameter_1: data.parameter1,
				parameter_2: data.parameter2,
			};

			if (clientCurrent?.client_id) {
				const res = await axios.put(`api/clients/${clientCurrent?.client_id}`,
					{
						client: clientData,
					},
				);
				toast.success(res.data.message, {
					position: 'top-center',
					autoClose: 3000,
					style: {
						width: '380px',
						height: '220px',
						fontSize: '24px',
					},
					theme: 'colored'
				})
				updateClients();
				getUpdate();
			} else {
				const res = await axios.post(`api/clients`,
					{
						userId: userId,
						groupId: Number(groupId),
						client: clientData
					},
				);
				toast.success(res.data.message, {
					position: 'top-center',
					autoClose: 3000,
					style: {
						width: '380px',
						height: '220px',
						fontSize: '24px',
					},
					theme: 'colored'
				})
				updateClients();
				getUpdate();
			}
			reset();
			{
				onClose && onClose();
			}
		} catch (error: any) {
			toast.error(error.message + " | " + error.response,
				{
					position: 'top-center',
					style: {
						width: '380px',
						height: '220px',
						fontSize: '24px',
					},
					theme: 'colored'
				})
			console.log(error.message + " | " + error.response);
		}

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
				<div className="relative">
					<input
						id="phone"
						type="text"
						defaultValue={clientCurrent?.tel && clientCurrent.tel}
						{...register("phone")}
						className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
						placeholder="+3801234567"
						required
					/>
					{errors.phone && (
						<span className="text-red-500 block absolute bottom-[-22px] left-0">{errors.phone.message}</span>
					)}
				</div>


				<label
					htmlFor="lastName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Прізвище
				</label>
				<div className="relative">
					<input
						id="lastName"
						type="text"
						defaultValue={clientCurrent?.last_name && clientCurrent.last_name}
						{...register("lastName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Петренко"
					/>
					{errors.lastName && (
						<span className="text-red-500 block absolute bottom-[-22px] left-0">{errors.lastName.message}</span>
					)}
				</div>

				<label
					htmlFor="firstName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Ім&apos;я
				</label>
				<div className="relative">
					<input
						id="firstName"
						type="text"
						defaultValue={clientCurrent?.first_name && clientCurrent.first_name}
						{...register("firstName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Петро"
					/>
					{errors.firstName && (
						<span className="text-red-500 block absolute bottom-[-22px] left-0">{errors.firstName.message}</span>
					)}
				</div>

				<label
					htmlFor="midleName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					По-батькові
				</label>
				<div className="relative">
					<input
						id="middleName"
						type="text"
						defaultValue={clientCurrent?.middle_name && clientCurrent.middle_name}
						{...register("middleName")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
						placeholder="Олександрович"
					/>
					{errors.middleName && (
						<span className="text-red-500 block absolute bottom-[-22px] left-0">{errors.middleName.message}</span>
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
							defaultValue={clientCurrent?.date_of_birth ? day : ''}
							className="input w-[118px] border py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500 ">
							<CreateOptions min={1} max={31} />
						</select>
						<div className="select_arrow">
						</div>
					</div>

					<div className="relative flex">
						<select
							id='month'
							{...register("month")}
							defaultValue={clientCurrent?.date_of_birth ? month : ''}
							className="input w-[138px] border py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500 ">
							<CreateOptions min={1} max={12} />
						</select>
						<div className="select_arrow">
						</div>
					</div>

					<div className="relative flex">
						<select
							id='year'
							{...register("year")}
							defaultValue={clientCurrent?.date_of_birth ? year : ''}
							className="input w-[194px] border py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500">
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
				<div className="relative">
					<input
						id="parameter1"
						type="text"
						defaultValue={clientCurrent?.parameter_1 && clientCurrent.parameter_1}
						{...register("parameter1")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
					/>
					{errors.parameter1 && (
						<span className="text-red-500 block absolute bottom-[-22px] left-0">{errors.parameter1.message}</span>
					)}
				</div>

				<label
					htmlFor="parameter2"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Параметр 2
				</label>
				<div className="relative">
					<input
						id="parameter2"
						type="text"
						defaultValue={clientCurrent?.parameter_2 && clientCurrent.parameter_2}
						{...register("parameter2")}
						className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
					/>
					{errors.parameter2 && (
						<span className="text-red-500 block absolute bottom-[-22px] left-0">{errors.parameter2.message}</span>
					)}
				</div>
			</div>
			<GreenButton size="big">Відправити</GreenButton>
		</form>
	);
};

export { CreateClientForm };