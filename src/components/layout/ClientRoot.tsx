"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import EmbedMeta from "@/components/layout/EmbedMeta";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
    <>
      <EmbedMeta imageUrl={"/api/og"} path={pathname} />
      <SpeedInsights />
      {children}
      <Analytics />
    </>
  );
}
