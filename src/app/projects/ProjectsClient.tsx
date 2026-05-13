"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { LangSelect } from "@/components/LanguageSelect";
import ProjectCards from "@/components/layout/Projects";
import { usePathname } from "next/navigation";
import AppShell from "@/components/pageNav/AppShell";
import React from "react";

export default function ProjectsClient() {
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
          <ProjectCards data={data!} />
        </div>
      </AppShell>
    </main>
  );
}
