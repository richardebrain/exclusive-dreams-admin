import { getAllOrders } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const orders = await getAllOrders();
  return NextResponse.json(orders);
}
export const dynamic = "force-dynamic";
