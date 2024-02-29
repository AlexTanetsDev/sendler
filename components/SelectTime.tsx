import { useCallback, useEffect, useRef, useState } from "react"; import Image from 'next/image';
import RSC from "react-scrollbars-custom";

type Props = {
	selectOptions?: string[];
	selectedOption: string | undefined;
	getSelect: (item: string | undefined) => void;
	widthValue?: number;
	startValue?: string;
	isModal?: boolean;
}

const SelectTime = ({ selectOptions,
	selectedOption,
	getSelect,
	widthValue = 474,
	startValue,
	isModal }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const selectBodyRef = useRef<HTMLDivElement | null>(null);
	let key = 0;

	const onClose = () => {
		setIsOpen(!isOpen);
	};

	const memoizedClose = useCallback(onClose, [isOpen])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && selectBodyRef?.current) {
				memoizedClose();
			};
		};

		const handleCloseInputClick = (e: any) => {
			if (selectBodyRef?.current && !selectBodyRef?.current?.contains(e.target as Node)) {
				memoizedClose();
				if (startValue === '00') {
					getSelect('00');
				} else {
					getSelect('');
				};
			};
		};


		if (isModal) {
			document.body.addEventListener('keydown', handleKeyDown);
			document.body.addEventListener('click', handleCloseInputClick);
		}
		else {
			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('click', handleCloseInputClick);
		}

		return () => {
			if (isModal) {
				document.body.removeEventListener('keydown', handleKeyDown);
				document.body.removeEventListener('click', handleCloseInputClick);
			}
			else {
				document.removeEventListener('keydown', handleKeyDown);
				document.removeEventListener('click', handleCloseInputClick);
			}
		};

	}, [memoizedClose, getSelect, startValue, isModal]);

	return (
		<div onClick={onClose} className={`select-wrap relative w-[${widthValue}px] ${isOpen ? `rounded-t-[18px]` : `border-[#E6E6E6] rounded-[18px]`}`}>
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

			{isOpen ? <div className={`w-full absolute overflow-auto h-60 -mt-[2px] bg-white rounded-b-[18px] border-[1px] border-[#E6E6E6] border-t-0`} ref={selectBodyRef}>
				<RSC>
					{selectOptions?.map((selectOption) => (
						<div key={key++} onClick={() => getSelect(selectOption)} className="select-item">{selectOption}</div>
					))}
				</RSC>
			</div > : null}
		</div>
	)
}
export default SelectTime;