import path from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import sharp from "sharp";
import type { CollageItem } from "@/lib/og/collage-url";

export const COLLAGE_WIDTH = 1024;
export const COLLAGE_HEIGHT = 1024;

const PUBLIC_DIR = path.join(process.cwd(), "public");

const PANEL_GAP = 24;
const ROW_GAP = 28;
const PANEL_PADDING = 12;
const PANEL_WIDTH = 460;
const IMAGE_WIDTH = PANEL_WIDTH - PANEL_PADDING * 2;
const IMAGE_HEIGHT = 258;

async function loadImage(src: string): Promise<string | null> {
  if (!src.startsWith("/")) return null;
  const clean = decodeURIComponent(src.split("?")[0].split("#")[0]);
  const abs = path.normalize(path.join(PUBLIC_DIR, clean.replace(/^\/+/, "")));
  if (abs !== PUBLIC_DIR && !abs.startsWith(PUBLIC_DIR + path.sep)) return null;
  try {
    const buffer = await sharp(abs)
      .rotate()
      .resize(IMAGE_WIDTH, IMAGE_HEIGHT, { fit: "cover" })
      .png({ compressionLevel: 9 })
      .toBuffer();
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

function fitLabel(label: string): string {
  const cleaned = label.replace(/\s+/g, " ").trim();
  return cleaned.length > 36 ? `${cleaned.slice(0, 36).trim()}…` : cleaned;
}

function renderPanel(item: CollageItem, last: boolean) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: PANEL_WIDTH,
        paddingTop: PANEL_PADDING,
        paddingBottom: 14,
        paddingLeft: PANEL_PADDING,
        paddingRight: PANEL_PADDING,
        borderRadius: 26,
        background: "rgba(255, 255, 255, 0.06)",
        marginRight: last ? 0 : PANEL_GAP,
      }}
    >
      {
        /* eslint-disable @next/next/no-img-element -- next/image is unsupported inside ImageResponse */
      }
      <img
        src={item.src}
        alt=""
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        style={{ borderRadius: 18, objectFit: "cover" }}
      />
      {
        /* eslint-enable @next/next/no-img-element */
      }
      <div
        style={{
          marginTop: 12,
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.15,
          color: "rgba(255, 255, 255, 0.92)",
        }}
      >
        {fitLabel(item.label)}
      </div>
      {item.subtitle ? (
        <div
          style={{
            marginTop: 6,
            fontSize: 19,
            lineHeight: 1.25,
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          {fitLabel(item.subtitle)}
        </div>
      ) : null}
      {item.tags && item.tags.length > 0 ? (
        <div
          style={{
            marginTop: 7,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
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
                  padding: "5px 11px",
                  borderRadius: 999,
                  fontSize: 15,
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
  eyebrow,
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

  const rows: ReactNode[] = [];
  for (let i = 0; i < loaded.length; i += 2) {
    const rowItems = loaded.slice(i, i + 2);
    rows.push(
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: i + 2 < loaded.length ? ROW_GAP : 0,
        }}
      >
        {rowItems.map((item, j) => renderPanel(item, j === rowItems.length - 1))}
        {rowItems.length === 1 ? <div style={{ width: PANEL_WIDTH }} /> : null}
      </div>,
    );
  }

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
          padding: 40,
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
            flexDirection: "column",
            width: "100%",
            marginBottom: 40,
            position: "relative",
          }}
        >
          {eyebrow ? (
            <div
              style={{
                fontSize: 26,
                color: "rgba(255, 255, 255, 0.55)",
                marginBottom: 10,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #83a5d7, #684179)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>{rows}</div>
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