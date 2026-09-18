import { NextResponse } from "next/server";
import { serializeDiscordEmbedData } from "@/lib/embeds/build";
import { DEFAULT_ACCENT_COLOR, SITE_URL } from "@/lib/constants";
import { getMetadata } from "@/components/getMetaData";

export const dynamic = "force-dynamic";

export async function GET() {
  const meta = getMetadata("/projects/guildcount");

  const payload = serializeDiscordEmbedData({
    accentColor: DEFAULT_ACCENT_COLOR,
    url: `${SITE_URL}/projects/guildcount`,
    title: meta.title,
    subtitle: "Discord server lookup tool",
    image: { src: `${SITE_URL}/guildcount.png`, description: meta.title },
    contents: [meta.description],
    buttons: [
      {
        label: "Open Guild Count",
        url: `${SITE_URL}/projects/guildcount`,
      },
    ],
  });

  return NextResponse.json(payload, {
    headers: { "Cache-Control": "no-store" },
  });
}
