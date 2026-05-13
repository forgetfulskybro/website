import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import HomeClient from "./HomeClient";

const { title, description } = getMetadata("/");

export const metadata: Metadata = {
  title,
  description,
};

export default function HomePage() {
  return <HomeClient />;
}
