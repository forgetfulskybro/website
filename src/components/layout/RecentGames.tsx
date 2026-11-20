"use client";
import { recentGames } from "../GamesArray";
import { MoreGames } from "./MoreGames";
import { GameCard } from "./GameCard";
import React from "react";

export const RecentGames: React.FC = () => {
  return (
    <>
      <GameCard games={recentGames()} />
      <MoreGames />
    </>
  );
};