import { NextResponse } from "next/server";
import db from "@/db";

// get one sending group
export async function GET({ params }: { params: { id: string } }) {
  const id = params.id;
}

// delete one sending group
export async function DELETE({ params }: { params: { id: string } }) {
  const id = params.id;
}
