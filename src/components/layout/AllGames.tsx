"use client";
import { allGames } from "../GamesArray";
import { GameCard } from "./GameCard";
import React from "react";

export const AllGames: React.FC = () => {
  const games = allGames();
  return (
    <>
      <GameCard games={games} />
    </>
  );
};
