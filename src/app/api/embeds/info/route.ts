import { NextResponse } from "next/server";
import { serializeDiscordEmbedData } from "@/lib/embeds/build";
import { DEFAULT_ACCENT_COLOR, SITE_URL } from "@/lib/constants";
import { getMetadata } from "@/components/getMetaData";
import { getLatestSong } from "@/app/api/lastfm/LastFMData";
import { wakaData } from "@/app/api/wakatime/wakatimeData";

export const dynamic = "force-dynamic";

export async function GET() {
  const { title } = getMetadata("/info");
  const [song, waka] = await Promise.all([getLatestSong(), wakaData()]);

  const hours = waka ? Math.round(waka.decimal) : 0;
  const songLine = song?.title
    ? `${song.playing ? "Now playing" : "Last played"}: ${song.title} — ${
        song.artist
      }`
    : "The music I'm listening to and my coding stats.";

  const payload = serializeDiscordEmbedData({
    accentColor: DEFAULT_ACCENT_COLOR,
    url: `${SITE_URL}/info`,
    title,
    subtitle: songLine,
    image: song?.cover
      ? { src: song.cover, description: song.title ?? "Recent track" }
      : undefined,
    contents: [`${hours.toLocaleString()}+ hours coded on WakaTime.`],
    buttons: [
      ...(song?.url ? [{ label: "Last.fm", url: song.url }] : []),
      {
        label: "WakaTime",
        url: "https://wakatime.com/@ForGetFulSkyBro",
      },
    ],
  });

  return NextResponse.json(payload, {
    headers: { "Cache-Control": "no-store" },
  });
}
