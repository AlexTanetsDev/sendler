"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";
import { CreateClientForm } from "./forms/CreateClientForm";

interface Props {
	groupId?: number;
	updateClients: () => void;
	getUpdate: () => void;
};

const AddClient = ({ groupId, updateClients, getUpdate }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
		setIsDisabled(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsDisabled(false);
		document.body.classList.remove('overflow-hidden');
	};
	return (
		<>
			<GreenButton
				size="big"
				type="button"
				onClick={openModal}
				isDisabled={isDisabled}
			>
				Додати контакт
			</GreenButton>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<CreateClientForm
					onClose={closeModal}
					updateClients={updateClients}
					groupId={groupId}
					getUpdate={getUpdate} title='Редагування групи' />
			</Modal>
		</>
	);
};

export default AddClient;