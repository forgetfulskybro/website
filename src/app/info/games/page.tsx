import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import { DiscordEmbed, SITE_URL } from "@/components/seo/discord-embed";
import GamesClient from "./GamesClient";

const { title, description } = getMetadata("/info/games");

export const metadata: Metadata = {
  title,
  description,
};

export default function GamesPage() {
  return (
    <>
      <DiscordEmbed path="info/games">
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.content>{description}</DiscordEmbed.content>
        <DiscordEmbed.buttons>
          <DiscordEmbed.button label="View games" url={`${SITE_URL}/info/games`} />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <GamesClient />
    </>
  );
}
