import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import { DiscordEmbed, SITE_URL } from "@/components/seo/discord-embed";
import { collageUrl } from "@/lib/og/collage-url";
import { featuredArtworkItems } from "@/lib/og/featured";
import ArtworkClient from "./ArtworkClient";

const { title, description } = getMetadata("/artwork");

export const metadata: Metadata = {
  title,
  description,
};

const featuredArtwork = featuredArtworkItems();

export default function ArtworkPage() {
  const collageImage = collageUrl("/api/og/artwork", featuredArtwork);

  return (
    <>
      <DiscordEmbed path="artwork" url={`${SITE_URL}/artwork`}>
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.subtitle>Latest pieces</DiscordEmbed.subtitle>
        <DiscordEmbed.image src={collageImage} description="Latest pieces" />
        <DiscordEmbed.content>{description}</DiscordEmbed.content>
        <DiscordEmbed.buttons>
          <DiscordEmbed.button label="View artwork" url={`${SITE_URL}/artwork`} />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <ArtworkClient />
    </>
  );
}
