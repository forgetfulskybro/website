import { getMetadata } from "@/components/getMetaData";
import { generateCollage } from "@/lib/og/collage";
import { featuredArtworkItems } from "@/lib/og/featured";

export const runtime = "nodejs";

export async function GET() {
  const { title } = getMetadata("/artwork");

  return generateCollage({
    title,
    items: featuredArtworkItems(),
  });
}