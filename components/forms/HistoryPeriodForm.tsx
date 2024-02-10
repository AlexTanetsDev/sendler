'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

import { getUserHistory } from '@/app/utils';
import { IHistoryResponce } from '@/globaltypes/historyTypes';

type Props = {
  onSubmitPeriod: (data: IHistoryResponce[]) => void;
  id: number | undefined;
};

export interface FormInputsPeriod {
  startDate: Date;
  endDate: Date;
}

export default function HistoryPeriodForm({ onSubmitPeriod, id }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsPeriod>({
    resolver: async data => {
      try {
        // await schemaLogin.validateAsync(data, { abortEarly: false });
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

  const onSubmit: SubmitHandler<FormInputsPeriod> = async data => {
    try {
      const response = await axios.get(`/api/sending-history`, {
        params: {
          userId: id,
          start_date: data.startDate,
          end_date: data.endDate,
        },
      });
      const userHistory: IHistoryResponce[] = response.data.history;
      onSubmitPeriod(userHistory);
    } catch (error) {
      console.error('Помилка входу:', error);
      toast.error('Під час входу сталася помилка');
    }
  };

  return (
    <div className="ml-[26px]">
      <p className="mb-10 text-xl font-roboto text-[#1B1B30]">Пріод відправки SMS</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-8 w-full mb-10">
        <input
          type="date"
          {...register('startDate')}
          className="flex items-center justify-center h-[48px] w-[196px] py-2 px-3 font-montserrat bg-white text-[#1B1B30] rounded-[18px] text-[20px] border-[1px] border-[#E6E6E6]"
        />
        <div className="h-px w-6 bg-black"></div>
        <input
          type="date"
          {...register('endDate')}
          className="flex items-center justify-center h-[48px] w-[196px] py-2 px-3 font-montserrat bg-white text-[#1B1B30] rounded-[18px] text-[20px] border-[1px] border-[#E6E6E6]"
        />
        <button className="flex items-center justify-center py-2.5 px-9 font-roboto bg-[#32BB79] text-white rounded-[14px] text-[16px]">
          Дивитись
        </button>
      </form>
    </div>
  );
}
