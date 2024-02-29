import { IPaymentHistory } from '@/globaltypes/types';
import getUserGroups from '@/api-actions/getUserPaymentHistory';

type Props = {
  userId: number;
};

export default async function PaymentsList({ userId }: Props) {
  const userPaymentHistory = await getUserGroups(userId);
  const arrayUserPaymentHistory: IPaymentHistory[] = userPaymentHistory.rows;

  return (
    <table className="mt-10 w-full">
      <thead>
        <tr className="bg-headerTable text-white text-xl font-roboto  leading-[30px]">
          <th className="w-1/3 px-4 py-3 font-normal">Дата поповнення</th>
          <th className="w-1/3 px-4 py-3 font-normal">Сума, грн</th>
          <th className="w-1/3 px-4 py-3 font-normal">Кількість, СМС</th>
        </tr>
      </thead>
      <tbody>
        {arrayUserPaymentHistory.map(payment => (
          <tr key={payment.transaction_id} className="border-b border-rowUnderLine">
            <td className="px-4 py-3 text-center">{payment.transactions_date.toLocaleString()}</td>
            <td className="px-4 py-3 text-center">{payment.money_count}</td>
            <td className="px-4 py-3 text-center">{payment.sms_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
