import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const redirectUrl = new URL("/projects", request.url).toString();
    const response = NextResponse.redirect(redirectUrl, 302);
    response.cookies.set("discord_access_token", "", {
      maxAge: 0,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Redirect error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}