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

  if (pricePerSms === null) {
    return 'Вартість СМС невідома';
  }

  return (smsCount * pricePerSms).toFixed(2);
}

export function defineSmsCount(sum: number) {
  let price = 0;
  if (sum < 740) {
    price = 0.77;
  } else if (sum < 3650) {
    price = 0.74;
  } else if (sum < 7200) {
    price = 0.73;
  } else if (sum < 35500) {
    price = 0.72;
  } else if (sum < 70000) {
    price = 0.71;
  } else {
    price = 0.7;
  }

  if (price !== 0) {
    return Math.round(sum / price);
  } else {
    return undefined;
  }
}
