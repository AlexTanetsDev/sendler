"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import { CreateClientForm } from "./forms/CreateClientForm";
import { IClientDatabase } from "@/globaltypes/types";

interface Props {
	groupId?: number;
	client?: IClientDatabase;
	updateClients: () => void;
	getUpdate: () => void;
};

const EditClient = ({ groupId,
	client,
	updateClients,
	getUpdate }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove('overflow-hidden');
	};

	// control keydown 'Escape' depend on open select in CreateClientForm 
	const openSelect = (isOpen: boolean) => {
		setIsSelectOpen(isOpen);
	};

	return (
		<>
			<button type="button" onClick={openModal} className="row-table__btn">Редагувати</button>
			<Modal isOpen={isModalOpen} isSelectOpen={isSelectOpen} onClose={closeModal}>
				{groupId ?
					<CreateClientForm
						onClose={closeModal}
						openSelect={openSelect}
						groupId={groupId}
						currentClient={client}
						updateClients={updateClients}
						getUpdate={getUpdate}
						title='Редагування групи'
					/> :
					<CreateClientForm
						onClose={closeModal}
						openSelect={openSelect}
						updateClients={updateClients}
						currentClient={client}
						getUpdate={getUpdate}
						title='Редагування контакту' />}
			</Modal>
		</>
	);
};

export default EditClient;