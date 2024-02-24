'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { IHistoryPeriod } from '@/globaltypes/historyTypes';
import { useRouter, usePathname } from 'next/navigation';

export interface FormInputsPeriod {
  startDate: Date;
  endDate: Date;
}

export default function HistoryPeriodForm() {
  const router = useRouter();
  const pathname = usePathname();

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

  const onSubmit: SubmitHandler<IHistoryPeriod> = data => {
    const trimmedPath = pathname.match(/(\/user\/\d+\/statistics).*/);
    if (data.startDate && data.endDate && trimmedPath) {
      router.push(
        `${trimmedPath[1]}?startDate=${new Date(data.startDate).toISOString()}&endDate=${new Date(
          data.endDate
        ).toISOString()}`
      );
    } else {
      router.push(`${pathname}`);
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
