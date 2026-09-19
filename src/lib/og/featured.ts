import fs from "node:fs";
import path from "node:path";
import { artworks } from "@/components/ArtworkArray";
import getProjects from "@/components/ProjectsArray";
import { allGames } from "@/components/GamesArray";
import { isDiscordMedia } from "@/components/seo/discord-embed";
import {
  formatCollageDate,
  type CollageItem,
} from "@/lib/og/collage-url";

const GAME_LANG: Record<string, { progress?: string }> = (() => {
  try {
    const raw = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "languages", "en_EN.json"),
        "utf8",
      ),
    );
    return raw?.Games ?? {};
  } catch {
    return {};
  }
})();

const PROJECT_TAG_COLORS: Record<string, string> = {
  "Discord Bot": "#5764F3",
  "Revolt Bot": "#FE4654",
  Website: "#3B3E40",
  Application: "#533374",
  "Fluxer Bot": "#4742D9",
};

export function featuredArtworkItems(): CollageItem[] {
  return artworks
    .map((piece) => {
      const src = piece.images.find(isDiscordMedia);
      return src && src.startsWith("/")
        ? {
            src,
            label: piece.title,
            subtitle: formatCollageDate(piece.dateCreated),
            tags: [
              {
                label: `${piece.images.length} ${piece.images.length === 1 ? "image" : "images"}`,
                color: "rgba(255, 255, 255, 0.14)",
              },
            ],
          }
        : null;
    })
    .filter(
      (item): item is {
        src: string;
        label: string;
        subtitle: string;
        tags: { label: string; color: string }[];
      } => item !== null,
    )
    .slice(0, 4);
}

export function featuredProjectItems(): CollageItem[] {
  return getProjects({})
    .filter(
      (project) =>
        isDiscordMedia(project.image) && project.image.startsWith("/"),
    )
    .slice(0, 4)
    .map((project) => ({
      src: project.image as string,
      label: project.title,
      subtitle: `${project.footer.start} – ${project.footer.end}`,
      tags: project.tags
        .slice(0, 2)
        .map((tag) => ({ label: tag.name, color: PROJECT_TAG_COLORS[tag.name] })),
    }));
}

export function featuredGameItems(): CollageItem[] {
  return allGames()
    .filter((game) => isDiscordMedia(game.image) && game.image.startsWith("/"))
    .slice(0, 4)
    .map((game) => ({
      src: game.image as string,
      label: game.title,
      subtitle: GAME_LANG[game.target]?.progress
        ? `Progress: ${GAME_LANG[game.target]!.progress}`
        : undefined,
    }));
}