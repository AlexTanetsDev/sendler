import { NextRequest, NextResponse } from 'next/server';

import HttpError from '@/helpers/HttpError';
import { getUserHistoryDetails } from '@/app/api/controllers/sending-history';

import { IErrorResponse } from '@/globaltypes/types';
import { IHistoryDetailsProps, IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

export async function GET(
  req: NextRequest,
  { params }: { params: { historyId: string } }
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryDetailsProps>> {
  try {
    const historyId = params.historyId;

    if (!historyId) {
      return HttpError(400, `HistoryId required for getting user's history`);
    }

    const result: null | IHistoryDetailsResponce[] = await getUserHistoryDetails(historyId);

    if (!result) {
      return HttpError(400, `Failed to get user's history by historyId = ${historyId}`);
    }

    return NextResponse.json({ history: result });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
