import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import GamesClient from "./GamesClient";

const { title, description } = getMetadata("/info/games");

export const metadata: Metadata = {
  title,
  description,
};

export default function GamesPage() {
  return <GamesClient />;
}
