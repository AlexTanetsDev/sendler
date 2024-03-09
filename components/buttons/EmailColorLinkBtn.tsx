import { ReactNode } from "react";

interface IButtonProps {
	onClick?: () => void;
	children: ReactNode;
	isDisabled?: boolean;
	type?: "submit" | "button";
}

const EmailColorLinkBtn = ({ onClick, children, isDisabled, type = "submit" }: IButtonProps) => {
	return (
		<button
			type={type}
			className={`mt-2 text-emailColorLink ${isDisabled ? 'opacity-50' : 'opacity-100 cursor-pointer'}`}
			onClick={onClick}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default EmailColorLinkBtn;