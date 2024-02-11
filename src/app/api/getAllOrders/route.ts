import { getAllOrders } from "@/utils/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const orders = await getAllOrders();
  return Response.json(orders);
}
