"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { LangSelect } from "@/components/LanguageSelect";
import { AllGames } from "@/components/layout/AllGames";
import { usePathname } from "next/navigation";
import Page from "@/components/pageNav/pageSecondary";
import React from "react";

export default function Projects() {
  const data = LangSelect();

  return (
    <main key={usePathname()} className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()}></div>

      <Page>
        <div
          style={{ maxHeight: "80vh", fontSize: 10 }}
          className="flexGrid flex boxes"
        >
          <AllGames data={data!} />
        </div>
      </Page>
    </main>
  );
}
