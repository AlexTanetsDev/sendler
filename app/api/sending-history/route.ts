import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");
    const user_id = searchParams.get("id");

    if (!user_id) {
      return NextResponse.json(
        { error: "ID required for getting user's history" },
        { status: 400 }
      );
    }

    if (!start_date || !end_date) {
      const query = `
            SELECT sh.history_id, sh.sending_group_date, sg.group_name
            FROM send_groups sg
            INNER JOIN sending_history sh ON sg.group_id = sh.group_id
            INNER JOIN users u ON sg.user_id = u.user_id
            WHERE u.user_id = $1 
        `;

      const result = await db.query(query, [user_id]);
      const data = result.rows;

      return NextResponse.json({ data });
    }

    const query = `
            SELECT sh.history_id, sh.sending_group_date, sg.group_name
            FROM send_groups sg
            INNER JOIN sending_history sh ON sg.group_id = sh.group_id
            INNER JOIN users u ON sg.user_id = u.user_id
            WHERE u.user_id = $1 
            AND sh.sending_group_date >= $2 
            AND sh.sending_group_date <= $3
        `;

    const result = await db.query(query, [user_id, start_date, end_date]);
    const data = result.rows;

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const group_id = formData.get("groupId");

  try {
    const query = `
        INSERT INTO sending_history (group_id)
        VALUES ($1);
        RETURNING history_id
      `;

    const historyId = await db.query(query, [group_id]);

    return NextResponse.json({
      historyId,
      message: "Data successfully added to history",
    });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
