import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import HttpError from "@/helpers/HttpError";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const historyId = params.id;

  try {
    const query = `
        DELETE FROM sending_history
        WHERE history_id = $1
        RETURNING *
      `;

    const deletedData = await db.query(query, [historyId]);

    if (!deletedData) {
      return HttpError(404, `Failed to delete history by ID`);
    }

    return NextResponse.json({
      message: "Data successfully deleted from history",
    });
  } catch (error) {
    NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
