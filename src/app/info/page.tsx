import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import { DiscordEmbedLink, SITE_URL } from "@/components/seo/discord-embed";
import InfoClient from "./InfoClient";

const { title, description } = getMetadata("/info");

export const metadata: Metadata = {
  title,
  description,
};

export default function InfoPage() {
  return (
    <>
      <DiscordEmbedLink href={`${SITE_URL}/api/embeds/info`} />
      <InfoClient />
    </>
  );
}
