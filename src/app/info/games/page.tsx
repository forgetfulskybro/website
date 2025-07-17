"use client";
import { LangSelect } from "@/components/LanguageSelect";
import { AllGames } from "@/components/layout/AllGames";
import { usePathname } from "next/navigation";
import Page from "@/components/pageSecondary";
import React from "react";

export default function Projects() {
  const data = LangSelect();

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div
          style={{ maxHeight: "80vh", fontSize: 10 }}
          className="flexGrid flex boxes"
        >
          <AllGames />
        </div>
      </Page>
    </main>
  );
}
