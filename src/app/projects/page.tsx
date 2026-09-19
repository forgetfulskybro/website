import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import { DiscordEmbed, SITE_URL } from "@/components/seo/discord-embed";
import { collageUrl } from "@/lib/og/collage-url";
import { featuredProjectItems } from "@/lib/og/featured";
import ProjectsClient from "./ProjectsClient";

const { title, description } = getMetadata("/projects");

export const metadata: Metadata = {
  title,
  description,
};

const featuredProjects = featuredProjectItems();

export default function ProjectsPage() {
  const collageImage = collageUrl("/api/og/projects", featuredProjects);

  return (
    <>
      <DiscordEmbed path="projects" url={`${SITE_URL}/projects`}>
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.subtitle>Featured projects</DiscordEmbed.subtitle>
        <DiscordEmbed.image src={collageImage} description="Featured projects" />
        <DiscordEmbed.content>{description}</DiscordEmbed.content>
        <DiscordEmbed.buttons>
          <DiscordEmbed.button label="View projects" url={`${SITE_URL}/projects`} />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <ProjectsClient />
    </>
  );
}
