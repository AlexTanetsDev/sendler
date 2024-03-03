export function defineSum(smsCount: number) {
  let pricePerSms;

  switch (true) {
    case smsCount >= 100000:
      pricePerSms = 0.7;
      break;
    case smsCount >= 50000:
      pricePerSms = 0.71;
      break;
    case smsCount >= 10000:
      pricePerSms = 0.72;
      break;
    case smsCount >= 5000:
      pricePerSms = 0.73;
      break;
    case smsCount >= 1000:
      pricePerSms = 0.74;
      break;
    default:
      pricePerSms = 0.77;
  }

  return smsCount * pricePerSms;
}
