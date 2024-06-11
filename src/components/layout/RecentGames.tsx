"use client";
import { recentGames } from "../GamesArray";
import { MoreGames } from "./MoreGames";
import { GameCard } from "./GameCard";
import React from "react";

interface GamesProps {
  data: string;
}

export const RecentGames: React.FC<GamesProps> = ({ data }) => {
  const games = recentGames();
  return (
    <>
      <GameCard data={data!} games={games} />
      <MoreGames data={data} />
    </>
  );
};
