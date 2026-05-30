import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function escapeHtmlAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  const postUrl = new URL("/api/discord", request.url).toString();
  const safeCode = escapeHtmlAttr(code);
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="robots" content="noindex,nofollow"/></head>
<body>
<form id="discord-oauth" method="post" action="${postUrl}">
<input type="hidden" name="code" value="${safeCode}"/>
<noscript><button type="submit">Continue</button></noscript>
</form>
<script>document.getElementById("discord-oauth").submit();</script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function POST(request: Request) {
  let code: string | null = null;
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as { code?: string };
      code = body.code ?? null;
    } else {
      const form = await request.formData();
      const raw = form.get("code");
      code = typeof raw === "string" ? raw : null;
    }
  } catch {
    return NextResponse.redirect(new URL("/?error=invalid_body", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "no-store",
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        scope: "identify guilds",
        grant_type: "authorization_code",
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/discord`,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Token response not ok:", await tokenResponse.text());
      return NextResponse.redirect(new URL("/?error=token_failed", request.url));
    }

    const { access_token } = (await tokenResponse.json()) as {
      access_token?: string;
    };

    if (!access_token) {
      return NextResponse.redirect(new URL("/?error=no_token", request.url));
    }

    const response = NextResponse.redirect(
      new URL("/projects/guildcount", request.url)
    );

    response.cookies.set("discord_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}
