"use client";

import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { validationSchemaCreateClient } from "@/models/forms";
import { FormInputCreateClient, IGroupId, IClientDatabase } from "@/globaltypes/types";
import GreenButton from "../buttons/GreenButton";
import CreateOptions from "../CreateOptions";

interface Props {
	onClose: (() => void) | undefined;
	title?: string;
	groupId?: IGroupId | undefined;
	groupName?: string;
	client?: IClientDatabase;
};

const ClientForm = ({ onClose, title, groupName, client }: Props) => {

	const day = Number(client?.date_of_birth?.split('.')[0]);
	const month = Number(client?.date_of_birth?.split('.')[1]);
	const year = Number(client?.date_of_birth?.split('.')[2]);

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
		console.log("dat=", data);
		reset();
		{
			onClose && onClose();
		}

		toast.success(
			"Your submission has been received. We will respond to it as soon as possible."
		);
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className="w-[526px] mx-auto pb-11 pt-[29px]  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg px-[26px]"
		>
			{title && !groupName && <h1 className="form-title mb-8 mt-[15px]">{title}</h1>}
			{title && groupName && <h1 className="form-title mb-8 mt-[15px]">{`${title} - ${groupName}`}</h1>}
			<div className="text-left w-full mb-8">

				<label
					htmlFor="phone"
					className="font-roboto text-sm font-medium mb-2  mt-8 block"
				>
					Номер телефону
					<span className="ml-2 text-red-700">*</span>
				</label>
				<input
					id="phone"
					type="text"
					defaultValue={client?.tel && `+${client.tel}`}
					{...register("phone")}
					className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
					placeholder="+3801234567"
					required
				/>
				{errors.phone && (
					<span className="text-red-500 block">{errors.phone.message}</span>
				)}

				<label
					htmlFor="lastName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Прізвище
				</label>
				<input
					id="lastName"
					type="text"
					defaultValue={client?.last_name && client.last_name}
					{...register("lastName")}
					className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
					placeholder="Петренко"
				/>
				{errors.lastName && (
					<span className="text-red-500 block">{errors.lastName.message}</span>
				)}

				<label
					htmlFor="firstName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Ім&apos;я
				</label>
				<input
					id="firstName"
					type="text"
					defaultValue={client?.first_name && client.first_name}
					{...register("firstName")}
					className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
					placeholder="Петро"
				/>
				{errors.firstName && (
					<span className="text-red-500 block">{errors.firstName.message}</span>
				)}

				<label
					htmlFor="midleName"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					По-батькові
				</label>
				<input
					id="midleName"
					type="text"
					defaultValue={client?.middle_name && client.middle_name}
					{...register("midleName")}
					className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
					placeholder="Олександрович"
				/>
				{errors.midleName && (
					<span className="text-red-500 block">{errors.midleName.message}</span>
				)}

				<label
					htmlFor="day"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Дата народження
				</label>

				<select
					id='day'
					defaultValue={client?.date_of_birth && day}
					className="input w-[118px] border mr-3 py-2 px-3 text-center focus:outline-none focus:border-blue-500 ">
					<CreateOptions min={1} max={31} />
				</select>

				<select
					id='month'
					defaultValue={client?.date_of_birth && month}
					className="input w-[138px] border mr-3 py-2 px-3 text-center focus:outline-none focus:border-blue-500 ">
					<CreateOptions min={1} max={12} />
				</select>

				<select
					id='year'
					defaultValue={client?.date_of_birth && year}
					className="input w-[194px] border py-2 px-3 text-center focus:outline-none focus:border-blue-500 ">
					<CreateOptions min={1900} max={new Date().getFullYear()} />
				</select>

				<label
					htmlFor="parameter1"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Параметр 1
				</label>
				<input
					id="parameter1"
					type="text"
					defaultValue={client?.parameter_1 && client.parameter_1}
					{...register("parameter1")}
					className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
				/>
				{errors.parameter1 && (
					<span className="text-red-500 block">{errors.parameter1.message}</span>
				)}

				<label
					htmlFor="parameter2"
					className="font-roboto text-sm font-medium mb-2 mt-8 block"
				>
					Параметр 2
				</label>
				<input
					id="parameter2"
					type="text"
					defaultValue={client?.parameter_2 && client.parameter_2}
					{...register("parameter2")}
					className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
				/>
				{errors.parameter2 && (
					<span className="text-red-500 block">{errors.parameter2.message}</span>
				)}

			</div>
			<GreenButton size="big">Відправити</GreenButton>
		</form>
	);
};

export { ClientForm };