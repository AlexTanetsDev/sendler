export interface IHistoryResponce {
  history_id: number;
  sending_group_date: Date;
  group_name: string;
}

export interface IHistoryProps {
  history?: IHistoryResponce[];
  deletedHistory?: IHistoryResponce[];
  addedHistory?: IHistoryResponce[];
  message?: string;
}
