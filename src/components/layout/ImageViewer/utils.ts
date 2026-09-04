import type { CSSProperties } from "react";

export interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  title: string;
  dateCreated: string;
  cardRect: DOMRect | null;
}

export type ViewMode = "grid" | "single" | "gif";

export const isVideoUrl = (url: string) =>
  /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) || url.includes("video/");

export function formatTime(seconds: number) {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function getGridColumns(count: number): number {
  if (count <= 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return Math.ceil(Math.sqrt(count));
}

export function getCellSize(count: number): number {
  if (count <= 1) return 360;
  if (count <= 4) return 260;
  if (count <= 9) return 200;
  if (count <= 16) return 160;
  return 140;
}

export const GIF_BASE_MS = 1800;

export const glassButtonStyle: CSSProperties = {
  padding: "8px",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};