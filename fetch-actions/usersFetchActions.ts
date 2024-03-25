import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '@/helpers/AxiosInstance';
import { IGetUser, IUpdateUser } from './types';

const api = axiosInstance;

export async function getUser(userId: number | undefined) {
  try {
    const res = await api.get<IGetUser, AxiosResponse<IGetUser>>(`/api/users/${userId}`);
    return res;
  } catch (error: any) {}
}

export async function updateUser(
  userId: number | undefined,
  userLogin: string,
  password: string,
  newPassword: string,
  userName: string,
  tel: string,
  email: string
) {
  try {
    const res = await api.put<
      IUpdateUser,
      AxiosResponse<IUpdateUser>,
      {
        userLogin: string;
        password: string;
        newPassword: string;
        userName: string;
        tel: string;
        email: string;
      }
    >(`api/users/${userId}`, {
      userLogin,
      password,
      newPassword,
      userName,
      tel,
      email,
    });
    return res;
  } catch (error: any) {}
}

export async function createAlfaName(alfa_name: string, user_id: number) {
  try {
    const res = await api.patch<
      void,
      AxiosResponse<void>,
      {
        alfa_name: string;
        user_id: number;
      }
    >(`api/users`, {
      alfa_name,
      user_id,
    });
  } catch (error: any) {}
}

export async function getUsersAlfaNames() {
  try {
    const res = await axios.get(`/api/alfa-name`);
    return res;
  } catch (error: any) {}
}
