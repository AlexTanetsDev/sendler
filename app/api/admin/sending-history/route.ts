import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export async function DELETE(req: NextRequest) {
  const formData = await req.formData();
  const user_id = formData.get("id");

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

    const deletedData = await db.query(query, [user_id]);

    if (!deletedData) {
      return NextResponse.json(
        { error: "Failed to delete all user's history by userID" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "All user's data successfully deleted from history",
    });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
