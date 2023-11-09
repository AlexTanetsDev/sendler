import { NextResponse } from "next/server";
import { ErrorType } from "@/globaltypes/types";

const errorMessageList = {
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not found",
	409: "Conflict",
};

export default function HttpError(statusError: ErrorType, messageError = errorMessageList[statusError]): NextResponse<{ error: string; }> {
	return NextResponse.json({ error: messageError }, { status: statusError });
}
