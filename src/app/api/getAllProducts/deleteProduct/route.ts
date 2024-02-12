import { deleteProductFromDb } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function POST(repquest: Request) {
  const data = await repquest.json();
  try {
    await deleteProductFromDb(data.productId);
    return NextResponse.json(
      {
        message: "Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
