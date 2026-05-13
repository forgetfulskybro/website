"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { LangSelect } from "@/components/LanguageSelect";
import { AllGames } from "@/components/layout/AllGames";
import Page from "@/components/pageNav/pageSecondary";
import React from "react";

export default function GamesClient() {
  const data = LangSelect();

  return (
    <main className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()} />

      <Page>
        <div
          style={{ maxHeight: "80vh", fontSize: 14 }}
          className="flexGrid flex boxes"
        >
          <AllGames data={data!} />
        </div>
      </Page>
    </main>
  );
}
