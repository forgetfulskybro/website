import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import {
  DiscordEmbed,
  SITE_URL,
  toAbsoluteUrl,
  isEmbeddableImage,
} from "@/components/seo/discord-embed";
import { artworks } from "@/components/ArtworkArray";
import ArtworkClient from "./ArtworkClient";

const { title, description } = getMetadata("/artwork");

export const metadata: Metadata = {
  title,
  description,
};

const featuredArtwork = artworks
  .map((piece) => {
    const src = piece.images.find((image) => isEmbeddableImage(image));
    return src ? { src: toAbsoluteUrl(src), description: piece.title } : null;
  })
  .filter((item): item is { src: string; description: string } => item !== null)
  .slice(0, 4);

export default function ArtworkPage() {
  return (
    <>
      <DiscordEmbed path="artwork" url={`${SITE_URL}/artwork`}>
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.subtitle>Latest pieces</DiscordEmbed.subtitle>
        <DiscordEmbed.content>{description}</DiscordEmbed.content>
        <DiscordEmbed.gallery items={featuredArtwork} thumbnail />
        <DiscordEmbed.buttons>
          <DiscordEmbed.button label="View artwork" url={`${SITE_URL}/artwork`} />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <ArtworkClient />
    </>
  );
}
