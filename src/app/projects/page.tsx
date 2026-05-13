import type { Metadata } from "next";
import { getMetadata } from "@/components/getMetaData";
import ProjectsClient from "./ProjectsClient";

const { title, description } = getMetadata("/projects");

export const metadata: Metadata = {
  title,
  description,
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
