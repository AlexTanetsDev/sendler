import { NextResponse } from "next/server";
// import db from "@/db";

// get one sending group
export async function GET(request: Request, { params }: { params: { id: string } }) {
	console.log("params.id:   ", params.id);

	// console.log("params:  ", params)
	return NextResponse.json("params", { status: 200 });
}

// delete one sending group
export async function DELETE({ params }: { params: { id: string } }) {
	const id = params.id;
}
