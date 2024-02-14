'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import RSC from "react-scrollbars-custom";

import Recipient from '../Recipient';

type Props = {
	recipients: (string | number)[];
	getRecipients: (recipientsArray: (string | number)[]) => void;
};

export default function RecipientsForm({
	recipients,
	getRecipients

}: Props) {

	const [isSelected, setIsSelected] = useState(0);
	const { register, handleSubmit, reset } = useForm();
	const [isDisabled, setIsDisabled] = useState(false);

	const onSelect = (e: any) => {
		const { checked } = e.target;
		if (checked) {
			setIsSelected(isSelected + 1);
		} else {
			setIsSelected(isSelected - 1);
		}
	};

	const deleteRecipients = (recipientsArray: (string | number)[], indexArray: number[]) => {
		indexArray.map(index => recipientsArray.splice(index, 1));
		getRecipients(recipientsArray);
	};

	const onSubmit = async (data: any) => {

		setIsDisabled(true);
		const deletedRecipientsIndex: number[] = [];
		for (const key in data) {
			if (data[key] === true) {
				deletedRecipientsIndex.push(Number(key));
			}
		};
		deleteRecipients(recipients, deletedRecipientsIndex);
		reset();
		setIsDisabled(false);
	};

	const handleClick = () => {
		getRecipients([]);
	}


	return (
		<form onSubmit={handleSubmit(onSubmit)} className='scroll-bar z-999'>
			<ul className=' w-[611px] h-[336px] mb-8 py-3 rounded-[18px] border-[1px] border-[#E6E6E6] bg-white overflow-y-auto'>
				<RSC style={{ height: "100%" }}>
					{recipients.map((recipient, index) => (
						<Recipient
							key={index}
							index={index}
							recipient={recipient}
							register={register}
							onSelect={onSelect} />
					))}
				</RSC>
			</ul>
			<button className=" text-lg text-emailColorLink mr-5 cursor-pointer">Видалити обране</button>
			<button type='button' onClick={handleClick} className=" text-lg text-emailColorLink cursor-pointer">Очистити</button>
		</form>
	);
};


