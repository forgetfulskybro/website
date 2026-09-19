import { SITE_URL } from "@/lib/constants";
import { generateCollage } from "@/lib/og/collage";
import { featuredGameItems } from "@/lib/og/featured";

export const runtime = "nodejs";

export async function GET() {
  return generateCollage({
    title: "Most recent games",
    eyebrow: SITE_URL.replace(/^https?:\/\//i, ""),
    items: featuredGameItems(),
  });
}