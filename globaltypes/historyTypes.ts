import { IUserId, IGroupName } from "@/globaltypes/types";

export interface IHistoryId {
  history_id: number;
}

export interface IHistoryResponce extends IHistoryId, IGroupName {
  sending_group_date: Date;
}

export interface IHistoryProps {
  history?: IHistoryResponce[];
  deletedHistory?: IHistoryResponce[];
  addedHistory?: IHistoryResponce[];
  message?: string;
}

export interface IHistoryPeriod {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface IGetHistoryProps {
  id: number | undefined;
  historyPeriod?: IHistoryPeriod;
}
