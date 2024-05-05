"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";
import SelectSendSmsForm from "./forms/SelectSendSmsForm";
import { getSendSmsClients } from "@/fetch-actions/smsFetchActions";

interface Props {
	handleClickSubmit: () => void,
	setDisabledSendBtn: () => boolean,
	isDisabled: boolean,
	recipients: (string | number)[];
	balance: number | undefined;
};

const SendSmsModal = ({ handleClickSubmit, setDisabledSendBtn, isDisabled, recipients, balance }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [clientsQuantity, setClientsQuantity] = useState<number>();

	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove('overflow-hidden');
	};

	const handleClick = async () => {
		const res = await getSendSmsClients(recipients);
		setClientsQuantity(res?.length);
		if (balance && res?.length && balance > res?.length) {
			handleClickSubmit();
		} else {
			openModal();
		};
	};

	return (
		<>
			<GreenButton
				size="big"
				type="button"
				onClick={handleClick}
				isDisabled={setDisabledSendBtn() || isDisabled}
			>
				Надіслати
			</GreenButton>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<SelectSendSmsForm
					handleClickSubmit={handleClickSubmit}
					closeModal={closeModal}
					balance={balance}
					clientsQuantity={clientsQuantity}
				/>
			</Modal>
		</>
	);
};

export default SendSmsModal;