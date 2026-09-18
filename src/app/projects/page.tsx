import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import {
  DiscordEmbed,
  SITE_URL,
  toAbsoluteUrl,
  isEmbeddableImage,
} from "@/components/seo/discord-embed";
import getProjects from "@/components/ProjectsArray";
import ProjectsClient from "./ProjectsClient";

const { title, description } = getMetadata("/projects");

export const metadata: Metadata = {
  title,
  description,
};

export default function ProjectsPage() {
  const featuredProjects = getProjects({})
    .filter((project) => isEmbeddableImage(project.image))
    .slice(0, 6)
    .map((project) => ({
      src: toAbsoluteUrl(project.image as string),
      description: project.title,
    }));

  return (
    <>
      <DiscordEmbed path="projects" url={`${SITE_URL}/projects`}>
        <DiscordEmbed.title>{title}</DiscordEmbed.title>
        <DiscordEmbed.subtitle>Featured projects</DiscordEmbed.subtitle>
        <DiscordEmbed.content>{description}</DiscordEmbed.content>
        <DiscordEmbed.gallery items={featuredProjects} thumbnail />
        <DiscordEmbed.buttons>
          <DiscordEmbed.button label="View projects" url={`${SITE_URL}/projects`} />
        </DiscordEmbed.buttons>
      </DiscordEmbed>
      <ProjectsClient />
    </>
  );
}
