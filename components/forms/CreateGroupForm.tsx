'use client';

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { schemaReqCreateGroup } from "@/models/sending-groups";

import { IGroupName } from "@/globaltypes/types";
import GreenButton from "../buttons/GreenButton";

type Props = {
	id: number | undefined;
	getGroups: () => void;
}

export default function CreateGroupForm({ id, getGroups }: Props) {

	const {
		register,
		handleSubmit,
		reset,
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
		try {
			await axios.post(`api/sending-groups`,
				{
					group_name: data.group_name,
					cache: "no-store",
				},
				{
					params: {
						userId: id,
					},
				}
			);
			getGroups();
			reset({ group_name: '' });
		} catch (error: any) {
			toast.error(error.message + " | " + error.response,
				{
					position: 'top-center',
					style: {
						width: '280px',
						height: '120px',
						fontSize: '18px',
					},
					theme: 'colored'
				});
			console.log(error.message + " | " + error.response)
		}
	}
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className='mb-[50px] ml-[26px]'>
			<label htmlFor='group_name' className='block mb-3.5 label'>
				Назва групи
			</label>
			<div className='flex items-center'>
				<input id="group_name"
					type='text'
					{...register("group_name")}
					className='w-[474px] h-12 mr-8 px-4 input'
					required
				/>
				{errors.group_name && (
					<span className="text-red-500 ">{errors.group_name.message}</span>
				)}
				<GreenButton size="normal">Створити</GreenButton>
			</div>
		</form>
	);
};


