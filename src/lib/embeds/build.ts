import { isValidElement } from "react";
import type { ReactNode } from "react";

export type DiscordEmbedButtonStyle = 1 | 2 | 3 | 4 | 5;

export type DiscordEmbedImage = {
  src: string;
  description?: string;
};

export type DiscordEmbedButton = {
  label: string;
  url: string;
  style?: DiscordEmbedButtonStyle;
};

type EmbTextProps = { children?: ReactNode };

function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  return "";
}

function voidProps(_: unknown): null {
  void _;
  return null;
}

export function DiscordEmbedTitle(props: EmbTextProps): null {
  return voidProps(props);
}

export function DiscordEmbedSubtitle(props: EmbTextProps): null {
  return voidProps(props);
}

export function DiscordEmbedContent(props: EmbTextProps): null {
  return voidProps(props);
}

export function DiscordEmbedImage(props: {
  src: string;
  description?: string;
}): null {
  return voidProps(props);
}

export function DiscordEmbedGallery(props: {
  items: DiscordEmbedImage[];
}): null {
  return voidProps(props);
}

export function DiscordEmbedButton(props: DiscordEmbedButton): null {
  return voidProps(props);
}

export function DiscordEmbedButtons(props: {
  children?: ReactNode;
}): null {
  return voidProps(props);
}

type Collected = {
  title?: string;
  subtitle?: string;
  image?: DiscordEmbedImage;
  contents: string[];
  galleries: DiscordEmbedImage[][];
  buttons: DiscordEmbedButton[];
};

function collect(node: ReactNode, out: Collected): void {
  if (node == null || typeof node === "boolean") return;
  if (Array.isArray(node)) {
    for (const child of node) collect(child, out);
    return;
  }
  if (!isValidElement(node)) return;

  const props = node.props as Record<string, ReactNode>;

  switch (node.type) {
    case DiscordEmbedTitle:
      out.title = toText(props.children);
      break;
    case DiscordEmbedSubtitle:
      out.subtitle = toText(props.children);
      break;
    case DiscordEmbedContent:
      out.contents.push(toText(props.children));
      break;
    case DiscordEmbedImage: {
      const src = typeof props.src === "string" ? props.src : "";
      const description =
        typeof props.description === "string" ? props.description : undefined;
      out.image = {
        src,
        ...(description !== undefined ? { description } : {}),
      };
      break;
    }
    case DiscordEmbedGallery: {
      const raw = Array.isArray(props.items)
        ? (props.items as DiscordEmbedImage[])
        : [];
      out.galleries.push(
        raw.map((item) => ({
          src: String(item.src),
          ...(item.description ? { description: item.description } : {}),
        })),
      );
      break;
    }
    case DiscordEmbedButton: {
      const label = toText(props.label);
      const url = toText(props.url);
      out.buttons.push({
        label,
        url,
        ...(typeof props.style === "number"
          ? { style: props.style as DiscordEmbedButtonStyle }
          : {}),
      });
      break;
    }
    case DiscordEmbedButtons:
      collect(props.children, out);
      break;
    default:
      collect(props.children, out);
      break;
  }
}

function normalizeAccentColor(color?: string | number): number | undefined {
  if (typeof color === "number") return color;
  if (typeof color === "string") {
    const hex = color.replace(/^#/, "");
    if (/^[0-9a-f]{6}$/i.test(hex)) return parseInt(hex, 16);
  }
  return undefined;
}

function escapeMarkdown(text: string): string {
  return text.replace(/([\\*_~`|#>\[\]])/g, (match) => `\\${match}`);
}

function sanitizeMediaUrl(url: string): string {
  return url.replace(/ /g, "%20");
}

type DiscordSection = {
  type: 9;
  components: { type: 10; content: string }[];
  accessory?: { type: 11; media: { url: string } };
};

export function serializeDiscordEmbed({
  accentColor: rawAccentColor,
  url,
  children,
}: {
  accentColor?: string | number;
  url?: string;
  children?: ReactNode;
}) {
  const accentColor = normalizeAccentColor(rawAccentColor);

  const collected: Collected = {
    contents: [],
    galleries: [],
    buttons: [],
  };
  collect(children, collected);

  const components: object[] = [];

  const sectionTexts: { type: 10; content: string }[] = [];
  if (collected.title) {
    sectionTexts.push({
      type: 10,
      content: `# ${escapeMarkdown(collected.title)}`,
    });
  }
  if (collected.subtitle) {
    sectionTexts.push({ type: 10, content: escapeMarkdown(collected.subtitle) });
  }
  if (url) {
    sectionTexts.push({ type: 10, content: `-# ${url}` });
  }

  const section: DiscordSection = { type: 9, components: sectionTexts };
  if (collected.image) {
    section.accessory = {
      type: 11,
      media: { url: sanitizeMediaUrl(collected.image.src) },
    };
  }

  if (sectionTexts.length > 0 || collected.image) {
    components.push(section);
  }

  for (const images of collected.galleries) {
    components.push({
      type: 12,
      items: images.slice(0, 10).map((item) => ({
        media: { url: sanitizeMediaUrl(item.src) },
        ...(item.description
          ? { description: escapeMarkdown(item.description) }
          : {}),
      })),
    });
  }

  if (collected.contents.length > 0) {
    components.push({ type: 14, spacing: 1 });
    for (const text of collected.contents) {
      components.push({ type: 10, content: escapeMarkdown(text) });
    }
  }

  if (collected.buttons.length > 0) {
    components.push({
      type: 1,
      components: collected.buttons.map((button) => ({
        type: 2,
        style: 5,
        label: escapeMarkdown(button.label),
        url: button.url,
      })),
    });
  }

  return {
    component: {
      type: 17,
      ...(accentColor !== undefined ? { accent_color: accentColor } : {}),
      components,
    },
  };
}