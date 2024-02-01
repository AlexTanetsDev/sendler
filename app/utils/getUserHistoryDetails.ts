import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

export default async function getUserHistoryDetails(historyId: string) {
  try {
    const response = await axios.get(`api/sending-history/${historyId}`, {
      params: {
        historyId,
      },
    });

    const historyDetails: IHistoryDetailsResponce[] = response.data.history;

    return historyDetails;
  } catch (error: any) {
    console.log(error.message + ' | ' + error.response.data.error);
  }
}
