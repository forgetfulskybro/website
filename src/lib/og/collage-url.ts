import { createHash } from "node:crypto";
import { SITE_URL } from "@/lib/constants";

export type CollageTag = string | { label: string; color?: string };

export type CollageItem = {
  src: string;
  label: string;
  subtitle?: string;
  tags?: CollageTag[];
};

export function collageUrl(context: string, items: CollageItem[]): string {
  const version = createHash("sha1")
    .update(JSON.stringify(items))
    .digest("hex")
    .slice(0, 8);
  return `${SITE_URL}${context}?v=${version}`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatCollageDate(date: string): string {
  const [month, day, year] = date.split("/").map(Number);
  if (!month || !day || !year) return date;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}