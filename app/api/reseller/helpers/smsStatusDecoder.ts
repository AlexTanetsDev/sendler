export default function smsStatDecoder(statCode: number) {
  let sts: string;
  switch (statCode) {
    case 0:
      sts = "fullfield";
      break;
    case 255:
      sts = "pending";
      break;
    case -2:
      sts = "pending";
      break;
    case -1:
      sts = "pending";
      break;
    default:
      sts = "rejected";
  }

  return sts;
}
