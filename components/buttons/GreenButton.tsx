import { ReactNode } from "react";

interface IButtonProps {
  size: "big" | "normal";
  onClick?: () => void;
  children: ReactNode;
}

const GreenButton = ({ size, onClick, children }: IButtonProps) => {
  return (
    <button
      className={`${
        size === "big" ? "w-[198px]" : "w-[144px]"
      } py-[10px] rounded-[14px] bg-greenBtn hover:bg-hoverGreenBtn text-white text-base flex items-center justify-center transition-colors`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GreenButton;
