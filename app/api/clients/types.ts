
import { IClient, IClientId } from "@/globaltypes/types";

export interface IQieryParamsCreateClient { groupId: number, clients: IClient, userId: number };

export interface IQieryParamsDeleteClients { clientsId: number[] };