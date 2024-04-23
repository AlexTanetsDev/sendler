import { IHistoryResponce } from '@/globaltypes/historyTypes';
import { SmsStatusEnum } from '@/globaltypes/types';

export const countSuccessfullySentNumbers = (item: IHistoryResponce): number => {
  const clientStatusMap: any = {};

  item.clients?.forEach((client, index) => {
    const status = item?.recipient_status[index];

    clientStatusMap[client] = clientStatusMap[client]
      ? [...clientStatusMap[client], status]
      : [status];
  });

  const sentSms = Object.values(clientStatusMap).filter(client =>
    (client as SmsStatusEnum[]).every((status: string) => status === 'fullfield')
  );

  return sentSms.length;
};
