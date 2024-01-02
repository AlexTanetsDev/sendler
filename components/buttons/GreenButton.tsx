import { ReactNode } from "react";

interface IButtonProps {
  size: "big" | "normal";
  onClick?: () => void;
  children: ReactNode;
  isDisabled?: boolean;
}

const GreenButton = ({ size, onClick, children, isDisabled }: IButtonProps) => {
  return (
    <button
      className={`${
        size === "big" ? "w-[198px]" : "w-[144px]" 
      } py-[10px] rounded-[14px] ${isDisabled ? 'bg-gray-500' :  'bg-greenBtn hover:bg-hoverGreenBtn'}  text-white text-base flex items-center justify-center transition-colors`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default GreenButton;
