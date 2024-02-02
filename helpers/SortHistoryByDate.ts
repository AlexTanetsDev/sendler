import { IHistoryResponce } from '@/globaltypes/historyTypes';

export function summarizeHistoryByDate(userHistory: IHistoryResponce[]) {
  const mergedData: Record<string, IHistoryResponce> = {};

  userHistory.forEach(entry => {
    const dateKey: string = entry.sending_group_date.toISOString().split('T')[0];

    if (!mergedData[dateKey]) {
      mergedData[dateKey] = {
        sending_group_date: entry.sending_group_date,
        history_id: entry.history_id,
        group_name: entry.group_name,
        send_method: entry.send_method,
        recipient_status: entry.recipient_status,
      };
    } else {
      mergedData[dateKey].recipient_status = [
        ...mergedData[dateKey].recipient_status,
        ...entry.recipient_status,
      ];
      mergedData[dateKey].send_method = mergedData[dateKey].send_method.includes(entry.send_method) ? mergedData[dateKey].send_method : `${mergedData[dateKey].send_method},  ${entry.send_method}`
    }
  });

  const mergedArray = Object.values(mergedData);

  return mergedArray;
}
