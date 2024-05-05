import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
	recipient: string | number;
	index: number;
	register: UseFormRegister<FieldValues>
	onSelect: (e: any) => void;
}

const Recipient = ({
	recipient,
	index,
	register,
	onSelect
}: Props) => {
	return (
		<li className="flex  px-[26px] items-center h-[36px] text-base font-montserrat font-normal">
			<input
				id={String(index)}
				{...register(`${index}`)}
				placeholder="bluebill1049@hotmail.com"
				type="checkbox"
				onChange={onSelect}
			/>
			<label htmlFor={String(index)} className=""></label>
			<div className="flex items-center ml-[15px]">
				<div className="w-full text-left overflow-hidden">
					{(typeof recipient) === 'number' ? `+${recipient}` : recipient}
				</div>
			</div>
		</li>
	)
}

export default Recipient;

