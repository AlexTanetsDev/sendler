'use client';

import { useEffect, useState, useCallback } from 'react';
import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import { IHistoryResponce } from '@/globaltypes/historyTypes';
import HistoryList from './HistoryList';
import HistoryPeriodForm from './forms/HistoryPeriodForm';
import { FormInputsPeriod } from './forms/HistoryPeriodForm';

//Test
const userHistoryTest: IHistoryResponce[] = [
  {
    sending_group_date: new Date(),
    history_id: 123457676,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['fulfield', 'fulfield', 'fulfield'],
  },
  {
    sending_group_date: new Date(),
    history_id: 12345767236,
    group_name: 'Group name',
    send_method: 'Site',
    recipient_status: ['fulfield', 'fulfield', 'fulfield', 'fulfield'],
  },
  {
    sending_group_date: new Date(),
    history_id: 12345,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['fulfield', 'rejected'],
  },
  {
    sending_group_date: new Date(2021, 1, 10),
    history_id: 1256345,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['pending', 'fulfield'],
  },
  {
    sending_group_date: new Date(2021, 12, 20),
    history_id: 12336545,
    group_name: 'Group name',
    send_method: 'API',
    recipient_status: ['fulfield', 'fulfield', 'fulfield', 'fulfield'],
  },
];

type Props = {
  id: number | undefined;
};

export default function HistoryTable({ id }: Props) {
  const [userHistory, setUserHistory] = useState<IHistoryResponce[] | undefined>(userHistoryTest);

  // useEffect(() => {
  //   async function fetchAPI() {
  //     // const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
  //     //   id,
  //     // });
  //     try {
  //       // const response = await axios.get(`/api/sending-history`, {
  //       //   params: {
  //       //     userId: id,
  //       //   },
  //       // });
  //       // const userHistory: IHistoryResponce[] = response.data.history;
  //       // setUserHistory(userHistory);
  //     } catch (error: any) {
  //       console.log(error.message + ' | ' + error.response.data.error);
  //       setUserHistory([]);
  //     }
  //   }
  //   fetchAPI();
  // }, []);

  const memoizedUserHistory = useCallback(async () => {
    // const historyPeriod: IHistoryPeriod = {
    //   startDate: historyDate ? new Date(historyDate) : undefined,
    //   endDate: historyDate ? new Date(historyDate) : undefined,
    // };
    const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
      id,
      // historyPeriod,
    });

    if (userHistory) setUserHistory(userHistory);
  }, [id]);

  useEffect(() => {
    memoizedUserHistory();
  }, [memoizedUserHistory]);

  const handleHistoryPeriod = (data: IHistoryResponce[]) => {
    console.log(data);

    //   try {
    //     //   const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
    //     //     id,
    //     //     historyPeriod: data,
    //     //   });
    // setUserHistory(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  return (
    <>
      <div className="content-block">
        <HistoryPeriodForm onSubmitPeriod={handleHistoryPeriod} id={id} />
        <div className="flex items-center gap-[100px] h-[58px] px-[26px] font-roboto text-[20px] text-white bg-[#417D8A]">
          <p className="w-[194px]">Шлях відправлення</p>
          <p className="w-[184px]">Дата</p>
          <p className="w-[150px]">Відправленно </p>
          <p className="w-[150px]">Отримано</p>
        </div>
        <HistoryList userHistory={userHistory} />
      </div>
    </>
  );
}
