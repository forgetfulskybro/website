import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(
    new URL("/projects", process.env.NEXT_PUBLIC_BASE_URL)
  );
  response.cookies.set("discord_access_token", "", { maxAge: 0 });
  return response;
}
