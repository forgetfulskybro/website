"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { LangSelect } from "@/components/LanguageSelect";
import ArtworkGrid from "@/components/layout/ArtworkGrid";
import { usePathname } from "next/navigation";
import AppShell from "@/components/pageNav/AppShell";
import React from "react";

export default function ArtworkClient() {
  const data = LangSelect();
  const pathname = usePathname();
  return (
    <main key={pathname} className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()} />

      <AppShell>
        <div
          style={{ marginRight: 10, maxHeight: "80vh", overflowY: "auto" }}
          className="flexGrid"
        >
          <ArtworkGrid data={data!} />
        </div>
      </AppShell>
    </main>
  );
}
