"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";
import { AddClientForm } from "./forms/AddClientForm";

const EditClient = () => {
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
			<button type="button" onClick={openModal} className="row-table__btn">Редагувати</button>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<AddClientForm onClose={closeModal} title='Редагування групи' />
			</Modal>
		</>
	);
};

export default EditClient;