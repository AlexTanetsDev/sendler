import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/helpers/AxiosInstance';
import {
  IHistoryResponce,
  IGetHistoryProps,
  IHistoryDetailsResponce,
  ISendingHistoryResponce,
} from '@/globaltypes/historyTypes';
import { IGetUserHistory, IGetUserHistoryDetails } from './types';

const api = axiosInstance;

export async function getUserHistory({ id, historyPeriod }: IGetHistoryProps) {
  try {
    const response = await api.get<
      IGetUserHistory,
      AxiosResponse<IGetUserHistory>,
      {
        userId: number | undefined;
        start_date: Date | undefined;
        end_date: Date | undefined;
      }
    >(`api/sending-history`, {
      params: {
        userId: id,
        start_date: historyPeriod?.startDate,
        end_date: historyPeriod?.endDate,
      },
    });

    if (response?.status !== 200) {
      return [];
    }

    const history: IHistoryResponce[] = response.data.history;
    return history;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getUserHistoryDetails(historyId: string) {
  try {
    const response = await api.get<
      IGetUserHistoryDetails,
      AxiosResponse<IGetUserHistoryDetails>,
      {
        historyId: string;
      }
    >(`api/sending-history/${historyId}`, {
      params: {
        historyId,
      },
    });

    if (response?.status !== 200) {
      return [];
    }

    const historyDetails: IHistoryDetailsResponce[] = response.data.history;
    return historyDetails;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function toggleSendingPermission(historyId: number) {
  try {
    const response = await api.patch<
      ISendingHistoryResponce,
      AxiosResponse<ISendingHistoryResponce>
    >(`api/sending-history/${historyId}`);

    const history: ISendingHistoryResponce = response.data;
    return history;
  } catch (error: any) {
    console.log(error.message);
  }
}
