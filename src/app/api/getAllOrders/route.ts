import { getAllOrders } from "@/utils/firebase";

export async function GET(request: Request) {
  const req = await request.json();
  const orders = await getAllOrders();
  return Response.json(orders, { status: 200 });
}
