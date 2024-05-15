'use client';
import GreenButton from '../buttons/GreenButton';
import { useForm } from 'react-hook-form';
import { EnterOnlyFigures } from '@/helpers/EnterOnlyFigures';
import { deleteSMSFromUser } from '@/helpers/fetchUserId';
import { useEffect, useState } from 'react';
import { getUser } from '@/fetch-actions/usersFetchActions';
import { IUser } from '@/globaltypes/types';

type Props = {
  userId: number;
  transactionId: number;
};

const SMSReductionForm = ({ userId, transactionId }: Props) => {
  const { register, handleSubmit, reset } = useForm();

  const [user, setUser] = useState<IUser>();
  const [isUpdated, setisUpdated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(userId);
        setUser(response?.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, isUpdated]);

  const onSubmit = async (data: any) => {
    await deleteSMSFromUser(transactionId, data.reduction, data.description);
    reset();
    setisUpdated(prevIsUpdate => !prevIsUpdate);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-1/3 flex justify-items-center h-auto  py-4 items-center flex-col leading-6 px-[26px] border rounded-[18px] bg-priceTableBg ml-10"
    >
      <p className=" text-left text-l mb-8 italic">
        Поточний баланс: <span className=" text-xl ">{user?.balance}</span>СМС
      </p>
      <div className="text-left w-full mb-8">
        <label htmlFor="reduction" className="font-roboto text-sm font-medium mb-2 block">
          Зняти SMS з рахунку клієнта(шт):
        </label>
        <input
          id="reduction"
          {...register('reduction')}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input resize-none"
          placeholder="Введіть кількість СМС..."
          onKeyPress={EnterOnlyFigures}
        />
        <label htmlFor="description" className="font-roboto text-sm font-medium mb-2 block  mt-4">
          Додати додаткову інформацію про транзакцію:
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input resize-none"
          rows={4}
          placeholder="Введіть текст..."
        />
      </div>
      <GreenButton size="big">Зняти</GreenButton>
    </form>
  );
};

export default SMSReductionForm;
