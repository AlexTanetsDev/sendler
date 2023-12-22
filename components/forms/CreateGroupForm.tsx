'use client';

import axios from "axios";

import { useForm, SubmitHandler } from "react-hook-form";

import { schemaReqCreateGroup } from "@/models/sending-groups";

import { IGroupName } from "@/globaltypes/types";


type Props = {
	id: number | undefined;
}

export default function CreateGroupForm(userId: Props) {

	console.log('userId=', userId)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IGroupName>({
		resolver: async (data) => {
			try {
				await schemaReqCreateGroup.validateAsync(data, { abortEarly: false });
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
	})

	const onSubmit: SubmitHandler<IGroupName> = async (data) => {

		const res = await axios.post(
			`http://localhost:3000/api/sending-groups`,
			{
				group_name: data.group_name,
				cache: "no-store",
			},
			{
				params: {
					userId: userId,
				},
			}
		);
		console.log('RES=', res)
	}

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className='w-7/12 mb-14 ml-8'>
			<label htmlFor='group_name' className='block mb-3.5 input__title'>
				Назва групи
			</label>
			<div className='flex items-center'>
				<input id="group_name"
					type='text'
					{...register("group_name")}
					className='h-12 mr-8 grow input'
					required
				/>
				{errors.group_name && (
					<span className="text-red-500 ">{errors.group_name.message}</span>
				)}
				<button type="submit" className='action__btn'>Створити</button>
			</div>
		</form>
	);
};


