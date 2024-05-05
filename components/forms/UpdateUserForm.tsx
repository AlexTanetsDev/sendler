"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

import { validationSchemaUpdateUser } from "@/models/forms";
import { FormInputUpdateUser, IUser } from "@/globaltypes/types";
import GreenButton from "../buttons/GreenButton";
import { getUser, updateUser } from '@/fetch-actions/usersFetchActions';

interface Props {
	userId: number | undefined
};

const UpdateUserForm = ({ userId }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [userState, setUserState] = useState({
		user_login: '',
		email: '',
		tel: '',
		user_name: ''
	});


	const { user_login, tel, email, user_name } = userState;

	const onClick = () => {
		setIsOpen(isOpen => !isOpen);
		reset();
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

	const getData = async () => {
		if (userId) {
			const res = await getUser(userId);
			if (res) {
				setUserState(res.data.user);
			}
		};
	};

	const memoizedgetData = useCallback(getData, [userId]);

	useEffect(() => {
		memoizedgetData();
	}, [memoizedgetData]);

	const onSubmit: SubmitHandler<FormInputUpdateUser> = async (data) => {

		setIsDisabled(true);
		await updateUser(userId, data.login, data.password, data.newPassword, data.userName, `380${data.phone}`, data.email);
		getData();
		reset();
		setIsOpen(false);
		setIsDisabled(false);
	};
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className={`max-w-[526px] mx-auto p-[26px] ${isOpen ? "form-visible" : "form-hidden"} justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg overflow-hidden`}
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
			<div className={`w-full flex justify-items-center items-center flex-col ${isOpen ? "input-visible" : "input-hidden"}`}>
				<div className="text-left w-full mb-8">
					<label
						htmlFor="login"
						className="font-roboto text-sm font-medium mb-2 block"
					>
						Логін
						<span className="ml-1 text-red-700">*</span>
					</label>
					<div className="flex relative">
						<input
							id="login"
							type="text"
							defaultValue={user_login}
							{...register("login")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							placeholder="Your login"
							required
						/>
						{errors.login && (
							<span className="form-errors">{errors.login.message}</span>
						)}
					</div>

					<label
						htmlFor="password"
						className="font-roboto text-sm font-medium mb-2  mt-8 block"
					>
						Пароль
						<span className="ml-1 text-red-700">*</span>
					</label>
					<div className="flex relative">
						<input
							id="password"
							type="password"
							{...register("password")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							required
						/>
						{errors.password && (
							<span className="form-errors">{errors.password.message}</span>
						)}
					</div>

					<label
						htmlFor="newPassword"
						className="font-roboto text-sm font-medium mb-2  mt-8 block"
					>
						Новий пароль
						<span className="ml-1 text-red-700">*</span>
					</label>
					<div className="flex relative">
						<input
							id="newPassword"
							type="password"
							{...register("newPassword")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							required
						/>
						{errors.newPassword && (
							<span className="form-errors">{errors.newPassword.message}</span>
						)}
					</div>

					<label
						htmlFor="userName"
						className="font-roboto text-sm font-medium mb-2  mt-8 block"
					>
						Контактна особа
						<span className="ml-1 text-red-700">*</span>
					</label>
					<div className="flex relative">
						<input
							id="userName"
							type="text"
							defaultValue={user_name}
							{...register("userName")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							placeholder="Менеджер Петренко"
							required
						/>
						{errors.userName && (
							<span className="form-errors">{errors.userName.message}</span>
						)}
					</div>

					<label
						htmlFor="phone"
						className="font-roboto text-sm font-medium mb-2  mt-8 block"
					>
						Телефон для зв&apos;зку
						<span className="ml-1 text-red-700">*</span>
					</label>
					<div className="flex relative">
						<span className="absolute left-3 top-[9px]">+380</span>
						<input
							id="phone"
							type="text"
							defaultValue={(tel).slice(3, (tel).length)}
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
						htmlFor="email"
						className="font-roboto text-sm font-medium mb-2  mt-8 block"
					>
						Електронна пошта
						<span className="ml-1 text-red-700">*</span>
					</label>
					<div className="flex relative">
						<input
							id="email"
							type="email"
							defaultValue={email}
							{...register("email")}
							className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
							placeholder="example@mail.com"
							required
						/>
						{errors.email && (
							<span className="form-errors">{errors.email.message}</span>
						)}
					</div>
				</div>
				<GreenButton size="big" isDisabled={isDisabled}>Зберегти</GreenButton>
			</div>
		</form>
	);
};

export { UpdateUserForm };