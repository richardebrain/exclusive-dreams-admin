import { getAllOrders } from "@/utils/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error }, { status: 500 });
  }
}
