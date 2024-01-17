"use client";

import axios from "axios";
// import bcrypt from "bcrypt";

import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

import { validationSchemaUpdateUser } from "@/models/forms";
import { FormInputUpdateUser } from "@/globaltypes/types";
import GreenButton from "../buttons/GreenButton";
import { useState } from "react";
import Image from "next/image";

interface Props {
	user: {
		user_id: number | undefined;
		user_login: string | undefined;
		user_token: string | undefined;
		tel: number | undefined;
		email: string | undefined;
	}
};

const UpdateUserForm = ({ user }: Props) => {
	const { user_id, user_login, user_token, tel, email } = user;
	const [isOpen, setIsOpen] = useState(false);

	const onClick = () => {
		setIsOpen(isOpen => !isOpen);
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormInputUpdateUser>({
		resolver: async (data) => {
			try {
				await validationSchemaUpdateUser.validateAsync(data, {
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

	const onSubmit: SubmitHandler<FormInputUpdateUser> = async (data) => {
		const userData = {
			user_login: data.login,
			password: data.password,
			newPassword: data.newPassword,
			contacPerson: data.contactPerson,
			tel: data.phone,
			email: data.email,
		};

		console.log('user_token', user_token)

		console.log('userData', userData);
		if (user_token) {
			// const what = bcrypt.compare(userData.password, user_token);
			// console.log('WHAT=', what)
		};




		// if (userData?.client_id) {

		// 	await axios.put(`api/clients/${clientCurrent?.client_id}`,
		// 		{
		// 			client: clientData,
		// 		},
		// 	);

		// } else {

		// 	await axios.post(`api/clients`,
		// 		{
		// 			userId: userId,
		// 			groupId: Number(groupId),
		// 			client: clientData
		// 		},
		// 	);
		// 	getClients();
		// }
		// reset();
		// {
		// 	onClose && onClose();
		// }
		// toast.success(
		// 	"Your submission has been received. We will respond to it as soon as possible."
		// );
	};
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className="w-[526px] mx-auto py-[26px]  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg px-[26px]"
		>
			<div className="relative w-full text-center">
				<p color="dark" className="form-title">Анкета користувача</p>
				<button type="button" onClick={onClick} className="absolute top-1/2 right-0 translate-y-[-50%]">
					{isOpen ? <Image
						src="/svg/arrow-up.svg"
						alt="arrow down"
						width={32}
						height={32}
					/> :
						<Image
							src="/svg/arrow-down.svg"
							alt="arrow down"
							width={32}
							height={32}
						/>}
				</button>
			</div>
			{isOpen &&
				<div className="w-full flex justify-items-center  items-center flex-col mt-8">
					<div className="text-left w-full mb-8">
						<label
							htmlFor="login"
							className="font-roboto text-sm font-medium mb-2 block"
						>
							Логін
							<span className="ml-1 text-red-700">*</span>
						</label>
						<input
							id="login"
							type="text"
							defaultValue={user_login && user_login}
							{...register("login")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							placeholder="+3801234567"
							required
						/>
						{errors.login && (
							<span className="text-red-500 block">{errors.login.message}</span>
						)}

						<label
							htmlFor="password"
							className="font-roboto text-sm font-medium mb-2  mt-8 block"
						>
							Пароль
							<span className="ml-1 text-red-700">*</span>
						</label>
						<input
							id="password"
							type="password"
							{...register("password")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							required
						/>
						{errors.password && (
							<span className="text-red-500 block">{errors.password.message}</span>
						)}

						<label
							htmlFor="newPassword"
							className="font-roboto text-sm font-medium mb-2  mt-8 block"
						>
							Новий пароль
							<span className="ml-1 text-red-700">*</span>
						</label>
						<input
							id="newPassword"
							type="password"
							{...register("newPassword")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							required
						/>
						{errors.newPassword && (
							<span className="text-red-500 block">{errors.newPassword.message}</span>
						)}

						<label
							htmlFor="contactPerson"
							className="font-roboto text-sm font-medium mb-2  mt-8 block"
						>
							Контактна особа
							<span className="ml-1 text-red-700">*</span>
						</label>
						<input
							id="contactPerson"
							type="text"
							{...register("contactPerson")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							placeholder="Менеджер Петренко"
							required
						/>
						{errors.contactPerson && (
							<span className="text-red-500 block">{errors.contactPerson.message}</span>
						)}

						<label
							htmlFor="phone"
							className="font-roboto text-sm font-medium mb-2  mt-8 block"
						>
							Телефон для зв&apos;зку
							<span className="ml-1 text-red-700">*</span>
						</label>
						<input
							id="phone"
							type="text"
							defaultValue={tel && tel}
							{...register("phone")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							placeholder="+3801234567"
							required
						/>
						{errors.phone && (
							<span className="text-red-500 block">{errors.phone.message}</span>
						)}

						<label
							htmlFor="email"
							className="font-roboto text-sm font-medium mb-2  mt-8 block"
						>
							Телефон для зв&apos;зку
							<span className="ml-1 text-red-700">*</span>
						</label>
						<input
							id="email"
							type="email"
							defaultValue={email && email}
							{...register("email")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							placeholder="example@mail.com"
							required
						/>
						{errors.email && (
							<span className="text-red-500 block">{errors.email.message}</span>
						)}
					</div>
					<GreenButton size="big">Зберегти</GreenButton>
				</div>}
		</form>
	);
};

export { UpdateUserForm };