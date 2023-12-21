import React from "react";

type Props = {
  openModal: () => void;
};

export const FeedbackButton: React.FC<Props> = ({ openModal }) => {
  return (
    <button
      onClick={openModal}
      className="transition-colors bg-greenBtn py-[10px] w-[144px] rounded-[14px] focus:outline-none hover:bg-green-700 text-white text-lg"
    >
      Зв’язатись
    </button>
  );
};
