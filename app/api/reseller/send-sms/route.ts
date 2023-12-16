import { NextResponse } from "next/server";
import resellerAuth from "../helpers/resellerAuth";
import { getClientsTelByGroupId } from "../helpers/getClientsTelByGroupId";
import { createSmsUrlStr } from "../helpers/createSmsQueryString";
import { addSendingHistory } from "../helpers/addSendingHistory";
import { addSmsIdentificators } from "../helpers/addSmsIdetificators";
import { addSmsStatus } from "../helpers/addSmsStatus";
import { smsSender } from "../helpers/smsSender";

export async function POST(req: Request) {
  const authRes = await resellerAuth();
  if (!authRes) throw new Error("Authorisation error");

  const { group_id, text } = await req.json();

  const clients = await getClientsTelByGroupId(group_id);
  const smsQuerystr = createSmsUrlStr(clients, text);

  const identificators = await smsSender(authRes, smsQuerystr, clients.length);

  const historyId = await addSendingHistory(group_id);

  const setSmsIdentificatorsRes = await addSmsIdentificators(
    historyId,
    clients,
    identificators
  );

  const statusRes = await addSmsStatus(historyId, clients, "pending");

  return NextResponse.json(statusRes);
}

// const statuses = await updateSmsStatus(historyId);
// console.log("statuses :", statuses);
