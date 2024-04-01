import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '@/helpers/AxiosInstance';
import { IPaymentHistory } from '@/globaltypes/types';

const api = axiosInstance;

export async function allDebts() {
  try {
    const res = await axios.get(`api/admin/transactions-history`);
    return res.data.allDebts;
  } catch (error) {
    console.error('Error while fetching debts:', error);
    throw error;
  }
}

export async function paydTransactiobByUserId(transaction_id: number) {
  await api.patch(`api/admin/transactions-history`, { transaction_id: transaction_id });
}
