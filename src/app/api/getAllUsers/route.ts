import { getAllUsersDb, getGuestsContent } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getGuestsContent();
  return NextResponse.json(users);
}
export const dynamic = "force-dynamic";
