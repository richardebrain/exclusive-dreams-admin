import { getAllUsersDb } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getAllUsersDb();
  return NextResponse.json(users);
}
export const dynamic = "force-dynamic";
