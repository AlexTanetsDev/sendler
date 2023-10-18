import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db";

export async function GET(req: NextRequest) {
  try {
    // const userId = params.id;
    const searchParams = req.nextUrl.searchParams;
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");
    const user_id = searchParams.get("id");

    const query = `
            SELECT sg.group_name
            FROM send_groups sg
            INNER JOIN sending_history sh ON sg.group_id = sh.group_id
            INNER JOIN users u ON sg.user_id = u.user_id;
            WHERE sh.sending_group_date >= $1 AND sh.sending_group_date <= $2
        `;

    const result = await db.query(query, [start_date, end_date]);

    // const groupNames = result.rows.map((row: any) => {
    //   console.log(row);
    //   return row.group_name;
    // });
    // const data = await result.json();

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const group_id = formData.get("groupId");
  const user_id = formData.get("userId");

  try {
    const query = `
        INSERT INTO sending_history (group_id, user_id)
        VALUES ($1, $2);
      `;

    const result = await db.query(query, [group_id, user_id]);

    return NextResponse.json({
      result,
      message: "Data successfully added to history",
    });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

//For admin service
export async function DELETE(req: NextRequest) {
  const formData = await req.formData();
  const history_id = formData.get("historyId");

  try {
    const query = `
        DELETE FROM sending_history
        WHERE history_id = $1;
      `;

    const result = await db.query(query, [history_id]);

    return NextResponse.json({
      message: "Data successfully deleted from history",
    });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
