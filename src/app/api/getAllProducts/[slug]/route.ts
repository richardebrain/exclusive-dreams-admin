import { getSingleProduct } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      slug: string;
    };
  }
) {
    console.log(params);
    const { slug } = params;
    const res = await getSingleProduct(slug);
    return NextResponse.json(res);

}
export const dynamic = "force-dynamic";
