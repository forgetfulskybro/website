import { generateCollage } from "@/lib/og/collage";
import { featuredGameItems } from "@/lib/og/featured";

export const runtime = "nodejs";

export async function GET() {
  return generateCollage({
    title: "Most recent games",
    items: featuredGameItems(),
  });
}