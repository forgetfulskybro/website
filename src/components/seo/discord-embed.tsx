import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import {
  DiscordEmbedTitle,
  DiscordEmbedSubtitle,
  DiscordEmbedContent,
  DiscordEmbedImage,
  DiscordEmbedGallery,
  DiscordEmbedButton,
  DiscordEmbedButtons,
  serializeDiscordEmbed,
} from "@/lib/embeds/build";

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const DEFAULT_ACCENT_COLOR = "#36203F";
const SAFE_SEGMENT = /^[a-z0-9-]+$/i;
const DISCORD_MEDIA = /\.(png|jpe?g|gif|webp|avif|mp4|webm)(\?.*)?$/i;

export function toAbsoluteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${encodeURI(src)}`;
}

export function isDiscordMedia(src: string | null | undefined): src is string {
  return typeof src === "string" && DISCORD_MEDIA.test(src);
}

function writeEmbedFile(embedPath: string, payload: unknown): void {
  const segments = embedPath.split("/").filter(Boolean);
  if (segments.length === 0) return;
  if (!segments.every((segment) => SAFE_SEGMENT.test(segment))) return;

  try {
    const dir = path.join(process.cwd(), "public", "embeds");
    const filePath = path.join(dir, ...segments) + ".json";
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(payload));
  } catch { }
}

type DiscordEmbedRootProps = {
  path: string;
  url?: string;
  accentColor?: string | number;
  children?: ReactNode;
};

function DiscordEmbedRoot({
  path: embedPath,
  url,
  accentColor = DEFAULT_ACCENT_COLOR,
  children,
}: DiscordEmbedRootProps) {
  writeEmbedFile(
    embedPath,
    serializeDiscordEmbed({
      accentColor,
      url: url ?? `${SITE_URL}/${embedPath}`,
      children,
    }),
  );

  return (
    <>
      {children}
      <link
        rel="discord:component-embed"
        type="application/json"
        href={`${SITE_URL}/embeds/${embedPath}.json`}
      />
    </>
  );
}

export const DiscordEmbed = Object.assign(DiscordEmbedRoot, {
  title: DiscordEmbedTitle,
  subtitle: DiscordEmbedSubtitle,
  content: DiscordEmbedContent,
  image: DiscordEmbedImage,
  gallery: DiscordEmbedGallery,
  button: DiscordEmbedButton,
  buttons: DiscordEmbedButtons,
});