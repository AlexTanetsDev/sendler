"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";
import { FormFeedback } from "./forms/FormFeedback";

const Feedback = () => {
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
			<p className=" text-base font-medium">Зворотній зв’язок</p>
			<GreenButton size="normal" onClick={openModal} >Зв’язатись</GreenButton>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<FormFeedback onClose={closeModal} title='Зворотній зв’язок' cross={true}/>
			</Modal>
		</>
	);
};

export default Feedback;
