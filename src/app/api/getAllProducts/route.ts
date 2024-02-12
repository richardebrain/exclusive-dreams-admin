import { getAllProducts } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}
export const dynamic = "force-dynamic";
