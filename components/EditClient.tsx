"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import { ClientForm } from "./forms/ClientForm";
import { IClientDatabase, IGroupId } from "@/globaltypes/types";

interface Props {
	groupId?: number;
	client?: IClientDatabase;
	getClients: () => void
};

const EditClient = ({ groupId, client, getClients }: Props) => {
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
				{groupId ? <ClientForm onClose={closeModal} groupId={groupId} clientCurrent={client} getClients={getClients} title='Редагування групи' /> : <ClientForm onClose={closeModal} getClients={getClients} clientCurrent={client} title='Редагування контакту' />}
			</Modal>
		</>
	);
};

export default EditClient;