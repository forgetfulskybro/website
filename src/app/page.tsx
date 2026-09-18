import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import { DiscordEmbed, SITE_URL } from "@/components/seo/discord-embed";
import HomeClient from "./HomeClient";

const { title, description } = getMetadata("/");

export const metadata: Metadata = {
  title,
  description,
};

export default function HomePage() {
  return (
    <>
      <DiscordEmbed path="page" url={SITE_URL}>
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.subtitle>
          Developer & Open Source Enthusiast
        </DiscordEmbed.subtitle>
        <DiscordEmbed.image src={`${SITE_URL}/Me.png`} description={title} />
        <DiscordEmbed.content>{description}</DiscordEmbed.content>
        <DiscordEmbed.buttons>
          <DiscordEmbed.button
            label="Discord"
            url="https://discord.gg/ty6Rsua"
          />
          <DiscordEmbed.button
            label="GitHub"
            url="https://github.com/forgetfulskybro"
          />
          <DiscordEmbed.button
            label="Fluxer"
            url="https://fluxer.gg/jpXCwft"
          />
          <DiscordEmbed.button
            label="X"
            url="https://x.com/ForGetFulSkyBro"
          />
          <DiscordEmbed.button
            label="Steam"
            url="https://steamcommunity.com/profiles/76561198827011761/"
          />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <HomeClient />
    </>
  );
}
