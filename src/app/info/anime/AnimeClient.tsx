"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { AllAnime } from "@/components/layout/AllAnime";
import AppShell from "@/components/pageNav/AppShell";
import { AnimeEntry } from "@/lib/anilist";
import React from "react";

export default function AnimeClient({ anime }: { anime: AnimeEntry[] }) {
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
            {anime.length > 0 ? (
              <AllAnime anime={anime} />
            ) : (
              <div className="animeEmpty">
                No anime to show yet.
              </div>
            )}
          </div>
        </div>
      </AppShell>
    </main>
  );
}
