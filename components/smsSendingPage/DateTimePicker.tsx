import Image from 'next/image';
import { useState } from 'react';

interface IPickerState {
  handlePick: (el: string) => void;
  timeArr: string[];
  pickerState: string;
}

function DateTimePicker({ handlePick, timeArr, pickerState }: IPickerState) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className=" w-[150px] h-12 rounded-[18px] border border-inputBorder bg-white flex justify-between px-3 items-center relative">
      <span className=" text-mainTextColor text-xl font-montserrat">{pickerState}</span>
      {!isOpen ? (
        <Image
          src="svg/arrow-down.svg"
          alt="Arrow dovn icon"
          width={32}
          height={32}
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <Image
          src="svg/arrow-up.svg"
          alt="Arrow up icon"
          width={32}
          height={32}
          onClick={() => setIsOpen(!isOpen)}
        />
      )}

      {isOpen && (
        <ul className="absolute top-full left-[10px] w-[130px] h-[230px] bg-white rounded-[18px] border border-inputBorder py-2 flex flex-col gap-1  overflow-y-scroll">
          {timeArr.map(el => (
            <li
              key={el}
              onClick={() => handlePick(el)}
              className=" text-center text-mainTextColor text-xl font-montserrat cursor-pointer hover:text-emailColorLink transition-colors"
            >
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DateTimePicker;
