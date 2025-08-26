"use client";
import { allGames } from "../GamesArray";
import { GameCard } from "./GameCard";
import React from "react";

export const AllGames: React.FC<any> = (data: string) => {
  const games = allGames();
  return (
    <>
      <GameCard games={games} data={data!} />
    </>
  );
};
