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
import { DEFAULT_ACCENT_COLOR, SITE_URL } from "@/lib/constants";

export { SITE_URL };

const SAFE_SEGMENT = /^[a-z0-9-]+$/i;
const STILL_MEDIA = /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i;
const MAX_MEDIA_BYTES = 8 * 1024 * 1024;

export function toAbsoluteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${encodeURI(src)}`;
}

export function isDiscordMedia(src: string | null | undefined): src is string {
  return typeof src === "string" && STILL_MEDIA.test(src);
}

export function isEmbeddableImage(
  src: string | null | undefined,
): src is string {
  if (!isDiscordMedia(src)) return false;
  if (/^https?:\/\//i.test(src)) return true;
  try {
    const clean = decodeURIComponent(src.split("?")[0].split("#")[0]);
    const relative = clean.replace(/^\/+/, "");
    const stat = fs.statSync(path.join(process.cwd(), "public", relative));
    return stat.isFile() && stat.size <= MAX_MEDIA_BYTES;
  } catch {
    return false;
  }
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
  } catch {}
}

export function DiscordEmbedLink({ href }: { href: string }) {
  return (
    <link
      rel="discord:component-embed"
      type="application/json"
      href={href}
    />
  );
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
      <DiscordEmbedLink href={`${SITE_URL}/embeds/${embedPath}.json`} />
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
