"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { AllGames } from "@/components/layout/AllGames";
import AppShell from "@/components/pageNav/AppShell";
import React from "react";

export default function GamesClient() {
  return (
    <main className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()} />

      <AppShell>
        <div className="collectionPage">
          <div
            style={{ maxHeight: "80vh", fontSize: 14 }}
            className="flexGrid flex boxes"
          >
            <AllGames />
          </div>
        </div>
      </AppShell>
    </main>
  );
}
