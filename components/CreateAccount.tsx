'use client';
import { defineSum } from '@/helpers/DefinSum';
import { EnterOnlyFigures } from '@/helpers/EnterOnlyFigures';
import { useState } from 'react';


const CreateAccount = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const summ = defineSum(Number(inputValue));
  return (
    <div className="flex items-center mb-[74px]">
      <div className="relative flex items-center mr-8">
        <div className="relative">
          <input
            className="input w-[196px] h-12 mr-4 px-4"
            onKeyDown={EnterOnlyFigures}
            value={inputValue}
            onChange={handleInputChange}
            maxLength={12}
          />
          <p className="absolute -bottom-6 left-0 text-xs font-montserrat font-normal mr-56">
            Кількість
          </p>
        </div>
        <div className="relative">
          <p className="text-lg font-montserrat font-normal">Сума: {summ} грн</p>
        </div>
      </div>
      <span>Сформувати рахунок</span>
    </div>
  );
};

export default CreateAccount;
