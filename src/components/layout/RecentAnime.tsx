"use client";
import { AnimeEntry } from "@/lib/anilist";
import { AnimeCards } from "./AnimeCards";
import { MoreAnime } from "./MoreAnime";
import React from "react";

interface AnimeProps {
  anime: AnimeEntry[];
}

export const RecentAnime: React.FC<AnimeProps> = ({ anime }) => {
  return (
    <>
      <AnimeCards anime={anime.slice(0, 3)} />
      <MoreAnime />
    </>
  );
};
