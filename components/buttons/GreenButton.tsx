import { ReactNode } from "react";

interface IButtonProps {
	size: "big" | "normal";
	onClick?: () => void;
	children: ReactNode;
	isDisabled?: boolean;
	type?: "submit" | "button";
}

const GreenButton = ({ size, onClick, children, isDisabled, type = "submit" }: IButtonProps) => {
	return (
		<button
			type={type}
			className={`${size === "big" ? "w-[198px]" : "w-[144px]"
				} py-[10px] rounded-[14px] ${isDisabled ? 'bg-disable text-textDisable' : 'bg-greenBtn hover:bg-hoverGreenBtn text-white'} text-base flex items-center justify-center transition-colors`}
			onClick={onClick}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default GreenButton;
