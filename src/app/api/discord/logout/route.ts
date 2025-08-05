import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(
    new URL("/projects", request.url)
  );
  response.cookies.set("discord_access_token", "", { maxAge: 0 });
  return response;
}
