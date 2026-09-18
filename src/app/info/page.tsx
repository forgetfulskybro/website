import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import { DiscordEmbed, SITE_URL } from "@/components/seo/discord-embed";
import { getLatestSong } from "@/app/api/lastfm/LastFMData";
import { wakaData } from "@/app/api/wakatime/wakatimeData";
import InfoClient from "./InfoClient";

const { title, description } = getMetadata("/info");

export const metadata: Metadata = {
  title,
  description,
};

export const dynamic = "force-dynamic";

export default async function InfoPage() {
  const [song, waka] = await Promise.all([getLatestSong(), wakaData()]);

  const hours = waka ? Math.round(waka.decimal) : 0;
  const songLine = song?.title
    ? `${song.playing ? "Now playing" : "Last played"}: ${song.title} — ${
        song.artist
      }`
    : "The music I'm listening to and my coding stats.";

  return (
    <>
      <DiscordEmbed path="info" url={`${SITE_URL}/info`}>
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.subtitle>{songLine}</DiscordEmbed.subtitle>
        {song?.cover ? (
          <DiscordEmbed.image
            src={song.cover}
            description={song.title ?? "Recent track"}
          />
        ) : null}
        <DiscordEmbed.content>
          {`${hours.toLocaleString()}+ hours coded on WakaTime.`}
        </DiscordEmbed.content>
        <DiscordEmbed.buttons>
          {song?.url ? (
            <DiscordEmbed.button label="Last.fm" url={song.url} />
          ) : null}
          <DiscordEmbed.button
            label="WakaTime"
            url="https://wakatime.com/@ForGetFulSkyBro"
          />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <InfoClient />
    </>
  );
}
