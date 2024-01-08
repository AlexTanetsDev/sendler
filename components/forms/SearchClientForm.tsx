'use client';

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

import { useForm, SubmitHandler } from "react-hook-form";

import { schemaSearchClient } from "@/models/clients";
import { useState } from "react";

interface IFormInput {
	tel: string;
}

type Props = {
	getFilter: (e: any) => void;
	resetFilter: () => void;
}

export default function SearchClientForm({ getFilter, resetFilter }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: async (data) => {
			try {
				await schemaSearchClient.validateAsync(data, { abortEarly: false });
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

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		reset({ tel: '' });
		resetFilter();
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className='mb-[50px] ml-[26px]'>
			<label htmlFor='tel' className='block mb-3.5 title-main_text'>
				Пошук за номером телефону
			</label>
			<div className="flex">
				<input id="tel"
					type='tel'
					{...register("tel")}
					className='w-[474px] h-12 mr-8 px-4 input'
					onChange={getFilter}
					required
				/>
				{errors.tel && (
					<span className="text-red-500 ">{errors.tel.message}</span>
				)}
				<input type="submit" className='action__btn' value='Скинути' />
			</div>
		</form>
	);
};

