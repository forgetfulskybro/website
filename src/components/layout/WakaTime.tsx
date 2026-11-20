"use client";
import { WakaResponse } from "../../app/api/wakatime/wakatimeData";
import { WakaTime } from "@/hooks/WakaTime";
import {
  useMotionValue,
  useAnimationFrame,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Waka: React.FC = () => {
  const { decimal } = WakaTime() as WakaResponse;
  const hoursMotion = useMotionValue(0);
  const [displayHours, setDisplayHours] = React.useState(0);

  React.useEffect(() => {
    hoursMotion.set(0);
  }, [decimal, hoursMotion]);

  useAnimationFrame(() => {
    const current = hoursMotion.get();
    if (current < decimal) {
      const increment = Math.max(1, Math.ceil((decimal - current) / 20));
      hoursMotion.set(Math.min(current + increment, decimal));
    }
  });

  useMotionValueEvent(hoursMotion, "change", (latest) => {
    setDisplayHours(Math.round(latest));
  });

  return (
    <Link
      href={"https://wakatime.com/@ForGetFulSkyBro"}
      target="_blank"
      className="homeStatusCard homeWakaCard"
    >
      <Image
        className="homeStatusCover homeStatusLogo"
        src="/wakatime.png"
        alt="WakaTime Logo"
        width={64}
        height={64}
      />
      <div className="homeStatusBody">
        <span className="homeStatusTitle">
          {displayHours.toLocaleString()}+ hours
        </span>
        <span className="homeStatusArtist">
          on WakaTime
        </span>
      </div>
    </Link>
  );
};
