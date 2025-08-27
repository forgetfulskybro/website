"use client";
import { allGames } from "../GamesArray";
import { GameCard } from "./GameCard";
import React from "react";

interface GamesProp {
  data: string;
}

export const AllGames: React.FC<GamesProp> = ({ data }) => {
  const games = allGames();
  return (
    <>
      <GameCard games={games} data={data!} />
    </>
  );
};
