"use client";

import React, { useState } from "react";

import { FeedbackButton } from "./FeedbackButton";
import Modal from "./Modal/Modal";

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
      <p>Зворотній зв’язок</p>
      <FeedbackButton openModal={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Feedback;