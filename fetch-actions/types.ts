import { IClientDatabase, IClient, IGroupDatabase, IUser } from '@/globaltypes/types';
import { IHistoryResponce, IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

export interface IGetGroupClientsAndGroupName {
  res: {
    groupName: string;
    clients: IClientDatabase[];
  };
}

export interface IGetUserClients {
  clients: IClientDatabase[];
}

export interface IDeleteGroupClients {
  message: string;
}

export interface IUpdateUserClient {
  client: IClient;
}

export interface ICreateGroupClient {
  message: string;
}

export interface IGetUserGroups {
  groups: IGroupDatabase[];
}

export interface IGetUser {
  user: IUser;
}

export interface IUpdateUser {
  message: string;
}

export interface IUpdateUserBodyReq {
  userLogin: string;
  password: string;
  newPassword: string;
  userName: string;
  tel: number;
  email: string;
}

export interface IGetUserHistory {
  history: IHistoryResponce[];
}

export interface IGetUserHistoryDetails {
  history: IHistoryDetailsResponce[];
}

export interface Option {
  value: string;
  label: string;
}