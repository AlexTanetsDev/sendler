'use client';

import { useForm, SubmitHandler } from "react-hook-form";

import { schemaAddClientNumber } from "@/models/users";
import { EnterOnlyFigures } from "@/helpers/EnterOnlyFigures";

import { ITel } from "@/globaltypes/types";
import { useState } from "react";

type Props = {
	handleClick: (tel: number) => void;
};

export default function AddClientPhoneNumberForm({ handleClick }: Props) {
	const [tel, setTel] = useState('');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ITel>({
		resolver: async (data) => {
			try {
				await schemaAddClientNumber.validateAsync(data, { abortEarly: false });
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
				};
				return {
					values: {},
					errors: validationErrors,
				};
			}
		},
	});

	const onSubmit: SubmitHandler<ITel> = async (data) => {
		handleClick(Number('380' + data.tel));
		reset({ tel: '' });
	};

	const handleChange = (e: any) => {
		console.log('TEL', tel.length);
		setTel(e.target.value);
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='relative'>
				<span className="absolute left-3 top-[12px]">+380</span>
				<input id="tel"
					type='text'
					defaultValue={''}
					{...register("tel")}
					className='w-[474px] border py-[11px] pr-11 pl-[50px] input'
					placeholder="675555544"
					required
					maxLength={9}
					onKeyDown={EnterOnlyFigures}
					onChange={handleChange}
				/>
				{errors.tel && (
					<span className="text-red-500 ">{errors.tel.message}</span>
				)}
				<button disabled={tel.length < 9 ? true : true} className={`block mt-2 text-emailColorLink cursor-pointer ${tel.length < 9 ? 'opacity-50' : 'opacity-100'}`}>Додати телефон до списку</button>
			</div>
		</form>
	);
};


