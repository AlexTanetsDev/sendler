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
  for (let i = PricesArray.length - 1; i >= 0; i--) {
    const { count, price } = PricesArray[i];
    const [min, max] = count.split('-').map(Number);
    
    // Sprawdź, czy wprowadzona kwota jest większa niż minimalna dla danego przedziału
    if (sum >= min) {
      if (price !== null) {
        // Jeśli cena nie jest null, oblicz ilość SMS na podstawie ceny
        const smsCount = Math.floor(sum / price);
        return smsCount;
      } else {
        // Jeśli cena jest null, zwróć informację o długości umowy
        return 'Договірна';
      }
    }
  }

  // Jeśli wprowadzona kwota nie mieści się w żadnym zakresie cenowym
  return 0;
}
