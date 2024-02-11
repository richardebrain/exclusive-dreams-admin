import { getAllOrders } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const req =  request.url
  console.log(req, "req")
  const orders = await getAllOrders();
  return NextResponse.json(orders);
}
