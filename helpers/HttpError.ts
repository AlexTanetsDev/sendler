import { NextResponse } from "next/server";

type ErrorType = 400 | 401 | 403 | 404 | 409;

const errorMessageList = {
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not found",
	409: "Conflict",
};

export default function HttpError(statusError: ErrorType, messageError = errorMessageList[statusError]) {
	return NextResponse.json({ message: messageError }, { status: statusError });
}
