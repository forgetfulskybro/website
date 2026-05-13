import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import InfoClient from "./InfoClient";

const { title, description } = getMetadata("/info");

export const metadata: Metadata = {
  title,
  description,
};

export default function InfoPage() {
  return <InfoClient />;
}
