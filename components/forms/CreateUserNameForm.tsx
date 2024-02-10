'use client';

import { useForm, SubmitHandler } from "react-hook-form";

import { schemaReqCreateGroup } from "@/models/sending-groups";

import { IGroupName } from "@/globaltypes/types";
import GreenButton from "@/components/buttons/GreenButton";

type Props = {
	userId: number;
	getUserNamesArray: (id: number) => void;
	getIsOpened: () => void;
}

export default function CreateUserNameForm({ userId, getUserNamesArray, getIsOpened }: Props) {

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
		// await creaUserName(data.group_name, id);
		getUserNamesArray(userId);
		getIsOpened();
		reset({ group_name: '' });
	}
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className='mt-8'>
			<label htmlFor='group_name' className='block mb-3.5 label'>
				Нове ім&apos;я
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
				<GreenButton size="normal">Додати</GreenButton>
			</div>
		</form>
	);
};


