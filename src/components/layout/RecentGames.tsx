"use client";
import { recentGames } from "../GamesArray";
import { MoreGames } from "./MoreGames";
import { GameCard } from "./GameCard";
import React from "react";

interface GamesProps {
  data: string;
}

export const RecentGames: React.FC<GamesProps> = ({ data }) => {
  return (
    <>
      <GameCard games={recentGames()} data={data} />
      <MoreGames data={data} />
    </>
  );
};