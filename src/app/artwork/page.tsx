import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import ArtworkClient from "./ArtworkClient";

const { title, description } = getMetadata("/artwork");

export const metadata: Metadata = {
  title,
  description,
};

export default function ArtworkPage() {
  return <ArtworkClient />;
}
