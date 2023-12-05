import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import HttpError from "@/helpers/HttpError";
import { IErrorResponse } from "@/globalTypes/types";
import { IHistoryProps } from "@/globaltypes/historyTypes";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryProps>> {
  const historyId = params.id;

  try {
    const query = `
        DELETE FROM sending_history
        WHERE history_id = $1
        RETURNING *
      `;

    const result = await db.query(query, [historyId]);

    if (!result) {
      return HttpError(404, `Failed to delete user's history by ID`);
    }

    const deletedHistory = result.rows;

    return NextResponse.json({
      deletedHistory,
      message: "Data successfully deleted from history",
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
