import { getMetadata } from "@/components/getMetaData";
import { generateCollage } from "@/lib/og/collage";
import { featuredProjectItems } from "@/lib/og/featured";

export const runtime = "nodejs";

export async function GET() {
  const { title } = getMetadata("/projects");

  return generateCollage({
    title,
    items: featuredProjectItems(),
  });
}