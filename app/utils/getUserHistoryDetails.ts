import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

import { IHistoryResponce, IGetHistoryProps } from '@/globaltypes/historyTypes';

export default async function getUserHistoryDetails(historyId: string) {
  try {
    const response = await axios.get(`api/sending-history`, {
      params: {
        historyId,
      },
    });

    const history: IHistoryResponce[] = response.data.history;

    return history;
  } catch (error: any) {
    console.log(error.message + ' | ' + error.response.data.error);
  }
}
