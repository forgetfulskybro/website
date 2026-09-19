import { getMetadata } from "@/components/getMetaData";
import { SITE_URL } from "@/lib/constants";
import { generateCollage } from "@/lib/og/collage";
import { featuredProjectItems } from "@/lib/og/featured";

export const runtime = "nodejs";

export async function GET() {
  const { title } = getMetadata("/projects");

  return generateCollage({
    title,
    eyebrow: SITE_URL.replace(/^https?:\/\//i, ""),
    items: featuredProjectItems(),
  });
}