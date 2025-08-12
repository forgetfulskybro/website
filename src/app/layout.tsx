import { SpeedInsights } from "@vercel/speed-insights/next";
import EmbedMeta from "@/components/layout/EmbedMeta";
import { Analytics } from "@vercel/analytics/react";
import { Fira_Code } from "next/font/google";
import { Metadata } from "next";
import React from "react";
import "./globals.css";

const Fira = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sky",
};

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
        <EmbedMeta title="Sky 🐢" description={null} imageUrl={"/api/og"} />
        <meta name="keywords" content="ForGetFul, ForGetFulSkyBro, Sky" />
        <meta name="theme-color" content="#4ca6ca" />
        <meta name="msapplication-TileColor" content="#4ca6ca" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={Fira.className}>
        <SpeedInsights />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
