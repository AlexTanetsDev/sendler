import { NextRequest, NextResponse } from 'next/server';

import HttpError from '@/helpers/HttpError';
import {
  getUserHistoryDetails,
  toggleSendingPermission,
} from '@/app/api/controllers/sending-history';

import { IErrorResponse, SmsStatusEnum } from '@/globaltypes/types';
import {
  IHistoryDetailsProps,
  IHistoryDetailsResponce,
  ISendingHistoryResponce,
} from '@/globaltypes/historyTypes';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryDetailsProps>> {
  try {
    const historyId = params.id;

    if (!historyId) {
      return HttpError(400, `HistoryId required for getting user's history`);
    }

    const result: null | IHistoryDetailsResponce[] = await getUserHistoryDetails(historyId);

    if (!result) {
      return HttpError(400, `Failed to get user's history by historyId = ${historyId}`);
    }

    const formatedHistory = result.map(history => {
      return {
        ...history,
        recipient_status: `${history.recipient_status as unknown as string}`
          ?.replace(/{|}/g, '')
          .split(',') as SmsStatusEnum[],
      };
    });

    return NextResponse.json({ history: formatedHistory });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<IErrorResponse> | NextResponse<ISendingHistoryResponce>> {
  try {
    const historyId = params.id;

    if (!historyId) {
      return HttpError(400, `History Id required for updating sending permission`);
    }

    const result: null | ISendingHistoryResponce = await toggleSendingPermission(historyId);

    if (!result) {
      return HttpError(400, `Failed to update sending permission`);
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
