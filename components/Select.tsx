import { useCallback, useEffect, useRef, useState } from "react"; import Image from 'next/image';
import RSC from "react-scrollbars-custom";

type Props = {
	selectOptions?: string[];
	selectedOption: string;
	getSelect: (item: string) => void;
	widthValue?: number;
	startValue?: string;
	heightBodySelect: number;
}

const Select = ({ selectOptions, selectedOption, getSelect, widthValue = 474, startValue, heightBodySelect }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const selectBodyRef = useRef<HTMLDivElement | null>(null);
	let key = 0;

	const onClose = () => {
		setIsOpen(!isOpen)
	};

	const memoizedClose = useCallback(onClose, [isOpen])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				memoizedClose();
			};
		};

		const handleCloseClick = (e: any) => {
			if (selectBodyRef?.current && !selectBodyRef?.current?.contains(e.target as Node)) {
				memoizedClose();
				if (startValue === '00') {
					getSelect('00');
				} else {
					getSelect('');
				};
			};
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('click', handleCloseClick);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('click', handleCloseClick);
		};
	}, [memoizedClose, getSelect, startValue]);

	return (
		<div onClick={onClose} className={`select-wrap w-[${widthValue}px] ${isOpen ? ` rounded-t-[18px]` : `border-[#E6E6E6] rounded-[18px]`}`}>
			<div className='select'>
				<div className='absolute top-1/2 -translate-y-1/2 left-7 font-montserrat font-normal text-lg leading-6'>
					{isOpen && !selectedOption ? startValue : selectedOption}</div>
				{isOpen ?
					<Image
						src="/svg/arrow-up.svg"
						alt="Arrov up icon"
						width={32}
						height={32}
						className="absolute top-1/2 -translate-y-1/2 right-7 ml-auto cursor-pointer"
					/> : <Image
						src="/svg/arrow-down.svg"
						alt="Arrov down icon"
						width={32}
						height={32}
						className="absolute top-1/2 -translate-y-1/2 right-7 ml-auto cursor-pointer"
					/>}
			</div>

			{isOpen && <div className={`w-full overflow-auto h-24 -mt-[2px] bg-white rounded-b-[18px] border-[1px] border-[#E6E6E6] border-t-0`} ref={selectBodyRef}>
				<RSC>
					{selectOptions?.map((selectOption) => (
						<div key={key++} onClick={() => getSelect(selectOption)} className="select-item">{selectOption}</div>
					))}
				</RSC>
			</div >}
		</div>
	)
}
export default Select;