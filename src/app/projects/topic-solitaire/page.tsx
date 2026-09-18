import type { Metadata } from "next";
import { DiscordEmbed, SITE_URL } from "@/components/seo/discord-embed";

export const metadata: Metadata = {
  title: "Topic Solitaire",
  description: "Play Topic Solitaire in an embedded frame.",
};

export default async function TopicSolitaire() {
  return (
    <>
      <DiscordEmbed path="projects/topic-solitaire" url={`${SITE_URL}/projects/topic-solitaire`}>
        <DiscordEmbed.title>Topic Solitaire</DiscordEmbed.title>
        <DiscordEmbed.content>
          Play Topic Solitaire in an embedded frame.
        </DiscordEmbed.content>
        <DiscordEmbed.buttons>
          <DiscordEmbed.button
            label="Play now"
            url="https://topic-solitaire.vercel.app/"
          />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
        <iframe
          src="https://topic-solitaire.vercel.app/"
          title="Topic Solitaire Game"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />
      </div>
    </>
  );
}
