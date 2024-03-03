import { PricesArray } from '@/data/data';

export function defineSum(smsCount: number) {
  let pricePerSms;
  switch (true) {
    case smsCount >= 100000:
      pricePerSms = PricesArray[5].price;
      break;
    case smsCount >= 50000:
      pricePerSms = PricesArray[4].price;
      break;
    case smsCount >= 10000:
      pricePerSms = PricesArray[3].price;
      break;
    case smsCount >= 5000:
      pricePerSms = PricesArray[2].price;
      break;
    case smsCount >= 1000:
      pricePerSms = PricesArray[1].price;
      break;
    default:
      pricePerSms = PricesArray[0].price;
  }

  if (pricePerSms === null ) {
    return 'Вартість СМС невідома';
  }

  return (smsCount * pricePerSms).toFixed(2);
}
