import path from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import sharp from "sharp";
import type { CollageItem } from "@/lib/og/collage-url";

export const COLLAGE_WIDTH = 1024;
export const COLLAGE_HEIGHT = 362;

const PUBLIC_DIR = path.join(process.cwd(), "public");

const PAD_TOP = 20;
const PAD_SIDE = 20;
const PAD_BOTTOM = 20;
const BOX_GAP = 14;
const BOX_PADDING = 10;
const BOX_WIDTH = Math.floor(
  (COLLAGE_WIDTH - PAD_SIDE * 2 - BOX_GAP * 3) / 4,
);
const IMAGE_WIDTH = BOX_WIDTH - BOX_PADDING * 2;
const TITLE_MARGIN_TOP = 8;
const H_BOX =
  COLLAGE_HEIGHT - PAD_TOP - PAD_BOTTOM - TITLE_MARGIN_TOP - 30;

async function loadImage(src: string): Promise<string | null> {
  if (!src.startsWith("/")) return null;
  const clean = decodeURIComponent(src.split("?")[0].split("#")[0]);
  const abs = path.normalize(path.join(PUBLIC_DIR, clean.replace(/^\/+/, "")));
  if (abs !== PUBLIC_DIR && !abs.startsWith(PUBLIC_DIR + path.sep)) return null;
  try {
    const buffer = await sharp(abs)
      .rotate()
      .resize(Math.max(IMAGE_WIDTH, 320), 480, { fit: "cover" })
      .png({ compressionLevel: 9 })
      .toBuffer();
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

function fitLabel(label: string): string {
  const cleaned = label.replace(/\s+/g, " ").trim();
  return cleaned.length > 32 ? `${cleaned.slice(0, 32).trim()}…` : cleaned;
}

function renderPanel(item: CollageItem, last: boolean) {
  const label = fitLabel(item.label);
  const subtitle = item.subtitle ? fitLabel(item.subtitle) : undefined;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: BOX_WIDTH,
        height: H_BOX,
        padding: BOX_PADDING,
        borderRadius: 20,
        background: "rgba(255, 255, 255, 0.06)",
        marginRight: last ? 0 : BOX_GAP,
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image is unsupported inside ImageResponse, and this is the only element declared here */}
      <img
        src={item.src}
        alt=""
        width={IMAGE_WIDTH}
        style={{
          width: IMAGE_WIDTH,
          flex: "1 1 0",
          minHeight: 0,
          borderRadius: 14,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          marginTop: 8,
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1.15,
          color: "rgba(255, 255, 255, 0.92)",
        }}
      >
        {label}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 4,
            fontSize: 15,
            lineHeight: 1.25,
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          {subtitle}
        </div>
      ) : null}
      {item.tags && item.tags.length > 0 ? (
        <div
          style={{
            marginTop: 6,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {item.tags.map((tag, i) => {
            const label = typeof tag === "string" ? tag : tag.label;
            const color =
              typeof tag === "string"
                ? "rgba(255, 255, 255, 0.14)"
                : tag.color ?? "rgba(255, 255, 255, 0.14)";
            return (
              <div
                key={i}
                style={{
                  padding: "4px 9px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: "rgba(255, 255, 255, 0.92)",
                  background: color,
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export async function generateCollage({
  title,
  items,
}: {
  title: string;
  eyebrow?: string;
  items: CollageItem[];
}): Promise<Response> {
  const loaded = (
    await Promise.all(
      items
        .slice(0, 4)
        .map(async (item) => ({ ...item, src: await loadImage(item.src) })),
    )
  ).filter((item): item is CollageItem => item.src !== null);

  const panels: ReactNode[] = loaded.map((item, i) =>
    renderPanel(item, i === loaded.length - 1),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingTop: PAD_TOP,
          paddingLeft: PAD_SIDE,
          paddingRight: PAD_SIDE,
          paddingBottom: PAD_BOTTOM,
          background: "#141018",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(131, 100, 232, 0.14) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {panels}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: TITLE_MARGIN_TOP,
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1.15,
              background: "linear-gradient(135deg, #83a5d7, #684179)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      width: COLLAGE_WIDTH,
      height: COLLAGE_HEIGHT,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}