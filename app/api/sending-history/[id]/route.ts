import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

import HttpError from '@/helpers/HttpError';
import {
  getUserHistory,
  createUserHistory,
  getUserHistoryDetails,
} from '@/app/api/controllers/sending-history';

import { IErrorResponse } from '@/globaltypes/types';
import { IHistoryProps, IHistoryResponce } from '@/globaltypes/historyTypes';

export async function GET(
  req: NextRequest,
  { params }: { params: { historyId: string } }
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryProps>> {
  try {
    const historyId = params.historyId;

    if (!historyId) {
      return HttpError(400, `HistoryId required for getting user's history`);
    }

    const result: null | IHistoryResponce[] = await getUserHistoryDetails(historyId);

    if (!result) {
      return HttpError(400, `Failed to get user's history by historyId = ${historyId}`);
    }

    return NextResponse.json({ history: result });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

