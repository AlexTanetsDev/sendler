import axios from "axios";
import resellerAuth from "./resellerAuth";

const { RESELLER_URL, RESELLER_SOURSE_ADRESS } = process.env;
export const smsSender = async (
  authRes: string,
  smsQuerystr: string,
  clientsLength: number
): Promise<string[]> => {
  const sendOption = clientsLength > 1 ? "SendBulk" : "Send";

  const sendedSmsRes = await axios.post(
    `${RESELLER_URL}/rest/Sms/${sendOption}?SessionID=${authRes}&SourceAddress=${RESELLER_SOURSE_ADRESS}&${smsQuerystr}`,
    {
      headers: {
        "Content-Type": "application/ x - www - form - urlencoded",
      },
    }
  );
  return sendedSmsRes.data;
};
