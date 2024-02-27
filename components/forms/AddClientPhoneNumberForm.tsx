'use client';

import { useForm, SubmitHandler } from "react-hook-form";

import { schemaAddClientNumber } from "@/models/users";

import GreenButton from "@/components/buttons/GreenButton";
import { ITel } from "@/globaltypes/types";
import { EnterOnlyFigures } from "@/helpers/EnterOnlyFigures";

type Props = {
	handleClick: (tel: number) => void;
};

export default function AddClientPhoneNumberForm({ handleClick }: Props) {

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

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='relative'>
				<span className="absolute left-3 top-[9px]">+380</span>
				<input id="tel"
					type='text'
					defaultValue={''}
					{...register("tel")}
					className='w-[474px] border py-2 pr-11 pl-[50px] input'
					placeholder="675555544"
					required
					maxLength={9}
					onKeyPress={EnterOnlyFigures}
				/>
				{errors.tel && (
					<span className="text-red-500 ">{errors.tel.message}</span>
				)}
				<button className="block mt-2 text-emailColorLink cursor-pointer">Додати телефон до списку</button>
			</div>
		</form>
	);
};


