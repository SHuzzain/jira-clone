import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const redirectUrl = searchParams.get("redirect") as string;

  redirect(redirectUrl);
}
