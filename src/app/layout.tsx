"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import EmbedMeta from "@/components/layout/EmbedMeta";
import { Analytics } from "@vercel/analytics/react";
import { Fira_Code } from "next/font/google";
import React from "react";
import "./globals.css";

const Fira = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    window.onload = function () {
      if (localStorage.getItem("theme"))
        document
          .querySelector<HTMLElement>(":root")
          ?.style.setProperty("--card-rgb", localStorage.getItem("theme"));
    };
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Me.png" type="image/png" sizes="any" />
        <EmbedMeta title="Sky 🐢" description={null} imageUrl={"/api/og"} />
        <meta name="theme-color" content="#4ca6ca" />
        <meta name="msapplication-TileColor" content="#4ca6ca" />
        <meta name="robots" content="index, follow" />
        <title>Sky</title>
      </head>
      <body className={Fira.className}>
        <SpeedInsights />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
