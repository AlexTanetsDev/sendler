import { NextResponse } from "next/server";
import axios from "axios";
import { resellerAuth } from "../resellerAuth";
import db from "@/db";

const { RESELLER_URL, RESELLER_SOURSE_ADRESS } = process.env;

export async function GET(req: Request) {
  const authRes = await resellerAuth();
  if (!authRes?.data) throw new Error("Authorisation error");

  const res = await axios.post(
    `${RESELLER_URL}rest/Sms/Send?SessionID=${authRes.data}&DestinationAddress=380665616086&SourceAddress=${RESELLER_SOURSE_ADRESS}&Data=test sms`,
    {
      headers: {
        "Content-Type": "application/ x - www - form - urlencoded",
      },
    }
  );

  return NextResponse.json(res.data);
}

//
