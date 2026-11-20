"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import EmbedMeta from "@/components/layout/EmbedMeta";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <EmbedMeta imageUrl={"/api/og"} path={pathname} />
      <SpeedInsights />
      {children}
      <Analytics />
    </>
  );
}
