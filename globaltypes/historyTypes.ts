import { IUserId, IGroupName, ITel, SmsStatusEnum, SendMethodType } from '@/globaltypes/types';

export interface IHistoryId {
	history_id: number;
}

export interface IHistoryResponce extends IGroupName {
  sending_group_date: Date;
  send_method: string;
  recipient_status: SmsStatusEnum[];
  text_sms?: string;
  user_name?: string;
  alfa_name?: string;
  clients?: string[];
  history_id: number | number[];
  sending_permission?: boolean;
}

export interface ISendingHistoryResponce extends IHistoryId {
	sending_group_date: Date;
	send_method: string;
	text_sms: string;
	sending_permission: boolean;
	alfa_name?: string;
}

export interface IHistoryDetailsResponce extends IHistoryId, IGroupName, ITel {
	sending_group_date: Date;
	send_method: string;
	recipient_status: SmsStatusEnum[];
	text_sms: string;
	alfa_name?: string;
	user_name: string;
	client_id?: number;
	sending_permission?: boolean;
}

export interface IHistoryProps {
	history?: IHistoryResponce[];
	deletedHistory?: IHistoryResponce[];
	addedHistory?: IHistoryResponce[];
	message?: string;
}

export interface IHistoryDetailsProps {
	history?: IHistoryDetailsResponce[];
	message?: string;
}

export interface IHistoryPeriod {
	startDate: Date | undefined;
	endDate: Date | undefined;
}

export interface IGetHistoryProps {
  id: number | undefined;
  sendMethod?: SendMethodType | null;
  historyPeriod?: IHistoryPeriod;
}
