import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import HttpError from "@/helpers/HttpError";
import { IErrorResponse } from "@/globalTypes/types";
import { IHistoryProps } from "@/globaltypes/historyTypes";

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryProps>> {
  // const formData = await req.formData();
  // const user_id = formData.get("userId");

  const user_id = true;

  if (!user_id) {
    return HttpError(400, `ID required for deleting user's history`);
  }

  try {
    const query = `
        DELETE FROM sending_history
        WHERE group_id IN (
          SELECT group_id
          FROM send_groups
          WHERE user_id = $1
        )
        RETURNING *
      `;

    const result = await db.query(query, [user_id]);
    // const result = true;

    if (!result) {
      return HttpError(404, `Failed to delete all user's history by userID`);
    }
    const deletedHistory = result.rows;
    // const deletedHistory = result;

    console.log("admin/history")

    return NextResponse.json({
      deletedHistory,
      message: "All user's data successfully deleted from history",
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
