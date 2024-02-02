import { NextRequest, NextResponse } from 'next/server';

import HttpError from '@/helpers/HttpError';
import { getUserHistory, createUserHistory } from '@/app/api/controllers/sending-history';
import { IErrorResponse } from '@/globaltypes/types';
import { IHistoryProps, IHistoryResponce } from '@/globaltypes/historyTypes';

export async function GET(
  req: NextRequest
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryProps>> {
  try {
    const { searchParams }: URL = new URL(req.url);
    const userId = Number(searchParams.get('userId'));
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');

    const startDate = start_date ? new Date(start_date) : undefined;
    const endDate = end_date ? new Date(end_date) : undefined;

    if (!userId) {
      return HttpError(400, `ID required for getting user's history`);
    }

    const result: null | IHistoryResponce[] = await getUserHistory(userId, {
      startDate,
      endDate,
    });

    if (!result) {
      return HttpError(400, `Failed to get user's history by userID = ${userId}`);
    }
    return NextResponse.json({ history: result });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryProps>> {
  try {
    const formData = await req.formData();
    const groupId = Number(formData.get('groupId'));
    const textSMS = String(formData.get('textSMS'));

    const result: null | IHistoryResponce = await createUserHistory(groupId, textSMS);

    if (!result) {
      return HttpError(400, `Failed to add data to user's history`);
    }

    return NextResponse.json({
      addedHistory: result,
      message: 'Data successfully added to history',
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
