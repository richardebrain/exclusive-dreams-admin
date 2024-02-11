import { getUserOrderFromDb } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      userid: string;
    };
  }
) {
  console.log(params);
  const { userid } = params;
  const res = await getUserOrderFromDb(userid);
  return NextResponse.json(res);
  //   const admin = await getAdminFromDb(userid);
  //   return NextResponse.json(admin);
}
