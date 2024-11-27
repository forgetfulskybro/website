"use client";
import { LangSelect } from "@/components/LanguageSelect";
import { ProjectCards } from "@/components/layout/Projects";
import { usePathname } from "next/navigation";
import Page from "@/components/page";
import React from "react";

export default function Projects() {
  const data = LangSelect();
  return (
    <main key={usePathname()} className="main">
      <Page>
        <div
          style={{ marginRight: 10, maxHeight: "80vh", overflowY: "auto" }}
          className="flexGrid"
        >
          <ProjectCards data={data!} />
        </div>
      </Page>
    </main>
  );
}
