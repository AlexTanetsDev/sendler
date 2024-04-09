"use client";

import GreenButton from "../buttons/GreenButton";

interface Props {
	handleClickSubmit: () => void,
	closeModal: () => void;
	balance: number | undefined;
	clientsQuantity: number | undefined;
};

const SelectSendSmsForm = ({
	handleClickSubmit,
	closeModal,
	balance,
	clientsQuantity }: Props) => {

	const handleSendButton = () => {
		handleClickSubmit();
		closeModal();
	}

	return (
		<div className="h-[300px] w-[500px] p-8 text-center rounded-[18px] bg-formBg">
			<p className="mb-4 text-mainTextColor text-redStar text-base font-montserrat">На вашому балансі недостатньо СМС.</p>
			<p className="mb-4 text-mainTextColor text-base font-montserrat">Ваш баланс: {balance} СМС</p>
			<p className="mb-4 text-mainTextColor text-base font-montserrat">Ви хочете відправити: {clientsQuantity} СМС</p>
			<p className="mb-8 text-mainTextColor text-base font-montserrat">Не всі повідомлення будуть відправлені.</p>
			<div className="flex justify-center gap-x-8">
				<GreenButton size="normal" type="button" onClick={handleSendButton} >Підтвердити</GreenButton>
				<GreenButton size="normal" type="button" onClick={closeModal} >Повернутись</GreenButton>
			</div>
		</div>
	);
};

export default SelectSendSmsForm;