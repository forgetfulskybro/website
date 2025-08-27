"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import EmbedMeta from "@/components/layout/EmbedMeta";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import { Fira_Code } from "next/font/google";
import React, { useEffect } from "react";
import "./globals.css";

const Fira = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      try {
        const rgbRegex = /^\d{1,3},\s*\d{1,3},\s*\d{1,3}$/;
        if (rgbRegex.test(storedTheme)) {
          document.documentElement.style.setProperty("--card-rgb", storedTheme);
        } else {
          console.warn("Invalid theme format in localStorage:", storedTheme);
          document.documentElement.style.setProperty(
            "--card-rgb",
            "98, 98, 100"
          );
        }
      } catch (error) {
        console.error("Error processing theme from localStorage:", error);
        document.documentElement.style.setProperty("--card-rgb", "98, 98, 100");
      }
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <EmbedMeta imageUrl={"/api/og"} path={usePathname()} />
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
