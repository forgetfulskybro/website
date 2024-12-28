"use client";
import { allGames } from "../GamesArray";
import { GameCard } from "./GameCard";
import React from "react";

interface GamesProps {
  data: string;
}

export const AllGames: React.FC<GamesProps> = ({ data }) => {
  const games = allGames();
  return (
    <>
      <GameCard data={data!} games={games} />
    </>
  );
};
