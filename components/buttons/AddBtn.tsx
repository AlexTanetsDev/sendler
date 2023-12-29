import { ReactNode } from "react";

interface IAddBtnProps {
  children: ReactNode;
  handleClick: () => void;
}

function AddBtn({ children, handleClick }: IAddBtnProps) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="transition-colors w-[144px] h-[44px] rounded-[14px] bg-greenBtn focus:outline-none hover:bg-[#156E43] px-6 py-[10px] text-monserrat text-base font-normal text-white"
    >
      {children}
    </button>
  );
}

export default AddBtn;
