'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import RSC from "react-scrollbars-custom";

import Recipient from '../Recipient';
import EmailColorLinkBtn from "../buttons/EmailColorLinkBtn";


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

	// variable for control of state of delete button
	const onSelect = (e: any) => {
		const { checked } = e.target;
		if (checked) {
			setIsSelected(isSelected + 1);
		} else {
			setIsSelected(isSelected - 1);
		}
	};

	// delete list of recipients
	const deleteRecipients = (recipientsArray: (string | number)[], indexArray: number[]) => {
		indexArray.map(index => recipientsArray.splice(index, 1));
		getRecipients(recipientsArray);
	};

	const onSubmit = async (data: any) => {
		// create list of recipients have been marked for deletion
		const deletedRecipientsIndex: number[] = [];
		for (const key in data) {
			if (data[key] === true) {
				deletedRecipientsIndex.push(Number(key));
			}
		};
		deleteRecipients(recipients, deletedRecipientsIndex);
		setIsSelected(0);
		reset();
	};

	const handleClick = () => {
		getRecipients([]);
		setIsSelected(0);
	};

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
			<div className='flex'>
				<div className='mr-5'>
					<EmailColorLinkBtn isDisabled={isSelected ? false : true} type='submit'>Видалити обране</EmailColorLinkBtn>
				</div>
				<EmailColorLinkBtn isDisabled={recipients.length > 0 ? false : true} type='button' onClick={handleClick}>Очистити</EmailColorLinkBtn>
			</div>
		</form>
	);
};


