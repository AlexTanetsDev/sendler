'use client';
import React, { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import GreenButton from '../buttons/GreenButton';

interface Props {
  getFilter: (e: any) => void;
}

const SearchUserForm = ({ getFilter }: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async () => {
    setIsDisabled(true);

    setIsDisabled(false);
    reset();
  };
  const onChange = (e: any) => {
    getFilter(e);
    if (e.target.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className='text-center'>
      <label htmlFor="login" className="block mb-3.5 label">
        Пошук за номером телефону
      </label>
      <div className="flex">
        <input
          id="login"
          type="login"
          {...register('login')}
          className="w-[474px] h-12  px-4 input"
          onChange={onChange}
          required
        />
      </div>
    </form>
  );
};

export default SearchUserForm;
