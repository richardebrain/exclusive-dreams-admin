import { getAllOrders } from "@/utils/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await getAllOrders();
    console.log(orders, "orders");
    return NextResponse.json(orders);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error }, { status: 500 });
  }
}
