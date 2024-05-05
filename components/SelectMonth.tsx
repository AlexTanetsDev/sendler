import { Option } from '@/fetch-actions/types';
import React, { ChangeEvent } from 'react'

interface SelectProps {
  options: Option[];
  value: string | undefined;
  onChange: (value: string) => void;
}

const SelectMonth: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
  };

  return (
      <select value={value} onChange={handleChange} className='border-spacing-1 w-40 py-3 px-4 rounded-lg text-base font-montserrat cursor-pointer'>
          {options.map(option => (
              <option key={option.value} value={option.value}>
                  {option.label}
              </option>
          ))}
      </select>
  );
};

export default SelectMonth