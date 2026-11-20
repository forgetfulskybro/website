import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import { DiscordEmbed, SITE_URL } from "@/components/seo/discord-embed";
import { getAnimeList } from "@/lib/anilist";
import AnimeClient from "./AnimeClient";

const { title, description } = getMetadata("/info/anime");

export const metadata: Metadata = {
  title,
  description,
};

export const revalidate = 3600;

export default async function AnimePage() {
  const anime = await getAnimeList();

  return (
    <>
      <DiscordEmbed path="info/anime">
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.subtitle>My anime list</DiscordEmbed.subtitle>
        <DiscordEmbed.content>{description}</DiscordEmbed.content>
        <DiscordEmbed.buttons>
          <DiscordEmbed.button
            label="View anime"
            url={`${SITE_URL}/info/anime`}
          />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <AnimeClient anime={anime} />
    </>
  );
}
