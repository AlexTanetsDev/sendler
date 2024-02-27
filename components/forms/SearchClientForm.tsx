'use client';

import { useForm, SubmitHandler } from "react-hook-form";

import { schemaSearchClient } from "@/models/clients";
import { useState } from "react";
import GreenButton from "../buttons/GreenButton";
import { EnterOnlyFigures } from "@/helpers/EnterOnlyFigures";

interface IFormInput {
	tel: string;
}

interface Props {
	getFilter: (e: any) => void;
	resetFilter: () => void;
}

export default function SearchClientForm({ getFilter, resetFilter }: Props) {
	const [isDisabled, setIsDisabled] = useState(true);
	const [filter, setFilter] = useState('380');
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

	const onChange = (e: any) => {
		getFilter(e);
		setFilter(e.target.value);
		if (e.target.value) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		};
	};

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {

		setIsDisabled(true);
		reset({ tel: '' });
		setFilter('380');
		resetFilter();
		setIsDisabled(false);
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className='mb-[50px] ml-[26px]'>
			<label htmlFor='tel' className='block mb-3.5 label'>
				Пошук за номером телефону
			</label>
			<div className="flex">
				<input id="tel"
					type='tel'
					value={filter}
					{...register("tel")}
					className='w-[474px] h-12 mr-8 px-4 input'
					onChange={onChange}
					onKeyDown={EnterOnlyFigures}
					required
				/>
				{errors.tel && (
					<span className="form-errors">{errors.tel.message}</span>
				)}
				<GreenButton size="normal" isDisabled={isDisabled}>Скинути</GreenButton>
			</div>
		</form>
	);
};

