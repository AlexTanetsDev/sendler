'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInputsLogin } from '@/globaltypes/types';
import { schemaLogin } from '@/models/forms';
import GreenButton from '../buttons/GreenButton';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ShowPassword from '../buttons/ShowPassword';
import { fetchUserId } from '@/helpers/fetchUserId';

const LoginForm = () => {
	const router = useRouter();
	const [show, setShow] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputsLogin>({
		resolver: async data => {
			try {
				await schemaLogin.validateAsync(data, { abortEarly: false });
				return { values: data, errors: {} };
			} catch (error: any) {
				const validationErrors: Record<string, { message: string }> = {};
				if (error.details) {
					error.details.forEach((detail: { context: { key: string | number }; message: any }) => {
						if (detail.context && detail.context.key) {
							validationErrors[detail.context.key] = {
								message: detail.message,
							};
						}
					});
				}
				return {
					values: {},
					errors: validationErrors,
				};
			}
		},
	});

	const onSubmit: SubmitHandler<FormInputsLogin> = async data => {
		setIsDisabled(true);

		try {
			const userId = await fetchUserId(data.login);

			const res = await signIn('credentials', {
				login: data.login,
				password: data.password,
				redirect: false,
			});
			console.log("res in login=", res);

			if (res?.ok === false) {
				if (res.status === 401) {
					toast.error('Неправильний логін або пароль');
				}
			}

			console.log('userId', userId)

			if (res && !res.error) {
				router.push(`/user/${userId}/mailing-list`);
				toast.success(`Ласкаво просимо ${data.login}`);
			}
		} catch (error) {
			console.error('Помилка входу:', error);
			toast.error('Під час входу сталася помилка');
		}
		setIsDisabled(false);
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className="w-[526px] flex justify-items-center  items-center flex-col leading-6 px-[26px] "
		>
			<div className="text-left w-full mb-8">
				<label htmlFor="login" className="font-roboto text-sm font-medium mb-2 block">
					Логін<span className=" text-redStar">*</span>
				</label>
				<div className="flex relative">
					<input
						id="login"
						type="text"
						{...register('login')}
						className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input"
						required
					/>
					{errors.login && <span className="form-errors">{errors.login.message}</span>}
				</div>

				<label htmlFor="password" className="font-roboto text-sm font-medium mb-2  mt-8 block">
					Пароль<span className=" text-redStar">*</span>
				</label>
				<div className="flex relative">
					<input
						id="password"
						type={show ? 'text' : 'password'}
						{...register('password')}
						className="w-full relative border py-2 pl-3 pr-11 focus:outline-none focus:border-blue-500 rounded-[18px] input"
						required
					/>
					<ShowPassword show={show} onClick={() => setShow(!show)} />
					{errors.password && <span className="form-errors ">{errors.password.message}</span>}
				</div>
			</div>
			<GreenButton size="big" isDisabled={isDisabled}>
				Увійти
			</GreenButton>
		</form>
	);
};

export { LoginForm };
