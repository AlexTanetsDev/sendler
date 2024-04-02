import { updateSmsStatusesByHistoryId } from "@/app/utils/updateSmsStatusesByHistoryId";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const history_id = searchParams.get("history_id");
	if (!history_id) {
		return NextResponse.json("missed query params: history_id", {
			status: 400,
		});
	}

	try {
		const updatedStatuses = await updateSmsStatusesByHistoryId(
			Number(history_id)
		);

		return NextResponse.json(updatedStatuses);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
