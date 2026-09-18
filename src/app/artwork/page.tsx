import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import {
  DiscordEmbed,
  SITE_URL,
  toAbsoluteUrl,
} from "@/components/seo/discord-embed";
import { artworks } from "@/components/ArtworkArray";
import ArtworkClient from "./ArtworkClient";

const { title, description } = getMetadata("/artwork");

export const metadata: Metadata = {
  title,
  description,
};

const featuredArtwork = artworks
  .filter((piece) => piece.images.length > 0)
  .slice(0, 6)
  .map((piece) => ({
    src: toAbsoluteUrl(piece.images[0]),
    description: piece.title,
  }));

export default function ArtworkPage() {
  return (
    <>
      <DiscordEmbed path="artwork" url={`${SITE_URL}/artwork`}>
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.subtitle>Latest pieces</DiscordEmbed.subtitle>
        <DiscordEmbed.content>{description}</DiscordEmbed.content>
        <DiscordEmbed.gallery items={featuredArtwork} />
        <DiscordEmbed.buttons>
          <DiscordEmbed.button label="View artwork" url={`${SITE_URL}/artwork`} />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <ArtworkClient />
    </>
  );
}
