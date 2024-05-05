'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { IHistoryPeriod } from '@/globaltypes/historyTypes';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface FormInputsPeriod {
  startDate: Date;
  endDate: Date;
}

export interface IHistoryPeriodFormProps {
  setHistoryPeriod: (startDate: Date, endDate: Date) => void;
}

export default function HistoryPeriodForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = useState<string | null>(searchParams.get('startDate'));
  const [endDate, setEndDate] = useState<string | null>(searchParams.get('endDate'));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHistoryPeriod>({
    resolver: async data => {
      try {
        return { values: data, errors: {} };
      } catch (error: any) {
        const validationErrors: Record<string, { message: string }> = {};
        if (error.details) {
          error.details.forEach((detail: { context: { key: string | number }; message: any }) => {
            if (detail.context && detail.context.key) {
              validationErrors[detail.context.key] = {
                message: detail.message,
              };
            }
          });
        }
        return {
          values: {},
          errors: validationErrors,
        };
      }
    },
  });

  const onSubmit: SubmitHandler<IHistoryPeriod> = () => {
    const trimmedPath = pathname.match(/(\/user\/\d+\/statistics).*/);
    if (startDate && endDate && trimmedPath) {
      router.push(
        `${trimmedPath[1]}?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(
          endDate
        ).toISOString()}`
      );
    } else {
      router.push(`${pathname}`);
    }
  };

  const handleChangeStartDate = (date: Date | null) => {
    setStartDate(date ? date.toISOString().split('T')[0] : null);
  };

  const handleChangeEndDate = (date: Date | null) => {
    setEndDate(date ? date.toISOString().split('T')[0] : null);
  };

  return (
    <div className="ml-[26px]">
      <p className="mb-10 text-xl font-roboto text-[#1B1B30]">Пeріод відправки SMS</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-8 w-full mb-10">
        <label htmlFor="startDate" className="text-xl text-mainTextColor flex cursor-pointer">
          <DatePicker
            id="startDate"
            selected={startDate ? new Date(startDate) : undefined}
            onChange={handleChangeStartDate}
            className="w-[250px] h-12 rounded-[18px] border border-inputBorder outline-none text-xl text-mainTextColor pr-[50px] pl-[50px] cursor-pointer"
            customInput={<input autoComplete="off" />}
            placeholderText="дд.мм.рррр"
            dateFormat="dd.MM.yyyy"
          />
          <Image src="/svg/calendar.svg" width={24} height={24} alt="Check box" className="ml-4" />
        </label>
        <div className="h-px w-6 bg-black"></div>
        <label className="text-xl text-mainTextColor flex cursor-pointer">
          <DatePicker
            id="endDate"
            selected={endDate ? new Date(endDate) : undefined}
            onChange={handleChangeEndDate}
            className="w-[250px] h-12 rounded-[18px] border border-inputBorder outline-none text-xl text-mainTextColor pr-[50px] pl-[50px] cursor-pointer"
            customInput={<input autoComplete="off" />}
            placeholderText="дд.мм.рррр"
            dateFormat="dd.MM.yyyy"
          />
          <Image src="/svg/calendar.svg" width={24} height={24} alt="Check box" className="ml-4" />
        </label>
        <button className="flex items-center justify-center py-2.5 px-9 font-roboto bg-[#32BB79] text-white rounded-[14px] text-[16px]">
          Дивитись
        </button>
      </form>
    </div>
  );
}
