"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";
import { ClientForm } from "./forms/ClientForm";

interface Props {
	groupId?: number;
	getClients: () => void
};

const AddClient = ({ groupId, getClients }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove('overflow-hidden');
	};
	return (
		<>
			<GreenButton size="big" type="button" onClick={openModal} >Додати контакт</GreenButton>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ClientForm onClose={closeModal} getClients={getClients} groupId={groupId} title='Редагування групи' />
			</Modal>
		</>
	);
};

export default AddClient;