"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";

const Feedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <p className=" text-base font-medium">Зворотній зв’язок</p>
      <GreenButton size="normal" onClick={openModal} >Зв’язатись</GreenButton>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Feedback;
