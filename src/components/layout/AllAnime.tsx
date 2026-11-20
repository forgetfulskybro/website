"use client";
import { AnimeEntry } from "@/lib/anilist";
import { AnimeCards } from "./AnimeCards";
import React from "react";

interface AnimeProps {
  anime: AnimeEntry[];
}

export const AllAnime: React.FC<AnimeProps> = ({ anime }) => {
  return <AnimeCards anime={anime} variant="full" />;
};
