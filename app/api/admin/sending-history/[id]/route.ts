import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

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
      return NextResponse.json(
        { error: "Failed to delete history by ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Data successfully deleted from history",
    });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
