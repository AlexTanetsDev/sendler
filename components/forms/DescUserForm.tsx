import React from 'react';
import GreenButton from '../buttons/GreenButton';
import { useForm } from 'react-hook-form';
import { AddDescription } from '@/helpers/fetchUserId';

type Props = {
  userId: number;
};

const DescUserForm = ({ userId }: Props) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    await AddDescription(userId, data.description);
    reset();
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-1/3 flex justify-items-center h-auto  py-4 items-center flex-col leading-6 px-[26px] border rounded-[18px] bg-priceTableBg"
    >
      <div className="text-left w-full mb-8">
        <label htmlFor="description" className="font-roboto text-sm font-medium mb-2 block">
        Додати додаткову інформацію про користувача:
        </label>
        <textarea
          // id="description"
          {...register('description')}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input resize-none"
          rows={4}
          placeholder="Введіть текст..."
        />
      </div>
      <GreenButton size="big">Додати</GreenButton>
    </form>
  );
};

export default DescUserForm;
