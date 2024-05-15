'use client';
import Image from 'next/image';
import GreenButton from '../buttons/GreenButton';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { userPaymant } from '@/helpers/fetchUserId';
import { EnterOnlyFigures } from '@/helpers/EnterOnlyFigures';
import { defineSmsCount } from '@/helpers/DefinSum';
import { fetchUserBalance, updateUserBalance } from '@/api-actions';

type Props = {
  userId: number;
};

const UserPaymentForm = ({ userId }: Props) => {
  const { register, handleSubmit, reset } = useForm();

  const [isPaid, setIsPaid] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSubmit = async (data: any) => {
    await userPaymant(userId, !isChecked ? data.summ : 0, !isChecked ? String(SMS) : inputValue, isPaid, data.description);

    setInputValue('0');
    setIsPaid(false);
    setIsChecked(false);
    reset();
  };

  const handleClickChecked = () => {
    setIsPaid(!isPaid);
  };
  const SMS = defineSmsCount(Number(inputValue));

  const handleClickCheckedCorect = () => {
    setIsChecked(isChecked => !isChecked);
  };


  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-1/3 flex justify-items-center h-auto  py-4 items-center flex-col leading-6 px-[26px] border rounded-[18px] bg-priceTableBg"
    >
      <div className="text-left w-full mb-8">
        <span className="flex items-center gap-1">
          {!isChecked ? (
            <Image
              src="/svg/checkbox-empty.svg"
              width={24}
              height={24}
              alt="Check box"
              onClick={handleClickCheckedCorect}
            />
          ) : (
            <Image
              src="/svg/checkbox-checked.svg"
              width={24}
              height={24}
              alt="Check box checked"
              onClick={handleClickCheckedCorect}
            />
          )}
          Korekta
        </span>
        <label htmlFor="summ" className="font-roboto text-sm font-medium mb-2 block">
          Сумма:
        </label>
        <input
          id="summ"
          {...register('summ')}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input resize-none"
          placeholder="Введіть сумму..."
          onKeyPress={EnterOnlyFigures}
          value={inputValue}
          onChange={handleInputChange}
          disabled={isChecked}
        />
        <label htmlFor="countSms" className="font-roboto text-sm font-medium mb-2 block mt-4">
          Kількість СМС:
        </label>
        <input
          id="countSms"
          {...register('countSms')}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input resize-none"
          onKeyPress={EnterOnlyFigures}
          value={isChecked ? inputValue : SMS}
          onChange={handleInputChange}
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
        {!isChecked && (
          <span className="flex items-center justify-center mt-4">
            {!isPaid ? (
              <Image
                src="/svg/checkbox-empty.svg"
                width={24}
                height={24}
                alt="Check box"
                onClick={handleClickChecked}
              />
            ) : (
              <Image
                src="/svg/checkbox-checked.svg"
                width={24}
                height={24}
                alt="Check box checked"
                onClick={handleClickChecked}
              />
            )}
            Оплачено
          </span>
        )}
      </div>
      <GreenButton size="big">{isChecked ? 'Korekta' : 'Поповнити'}</GreenButton>
    </form>
  );
};

export default UserPaymentForm;
