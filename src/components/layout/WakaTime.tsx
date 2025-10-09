"use client";
import { WakaResponse } from "../../app/api/wakatime/wakatimeData";
import Translate from "@/components/translation";
import { WakaTime } from "@/hooks/WakaTime";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface WakaProps {
  data: string;
}

export const Waka: React.FC<WakaProps> = ({ data }) => {
  const { seconds } = WakaTime() as WakaResponse;
  const translate = new Translate();
  const targetHours = !isNaN(seconds) ? Math.round(seconds / 3600) : 0;
  const hoursMotion = useMotionValue(0);
  const [displayHours, setDisplayHours] = React.useState(0);

  React.useEffect(() => {
    hoursMotion.set(0);
  }, [targetHours, hoursMotion]);

  useAnimationFrame(() => {
    const current = hoursMotion.get();
    if (current < targetHours) {
      const increment = Math.max(1, Math.ceil((targetHours - current) / 20));
      hoursMotion.set(Math.min(current + increment, targetHours));
    }
  });

  useMotionValueEvent(hoursMotion, "change", (latest) => {
    setDisplayHours(Math.round(latest));
  });

  return (
    <Link href={"https://wakatime.com/@ForGetFulSkyBro"} target="_blank">
      <div
        className="gameCard flex boxes"
        style={{
          width: 335,
          height: 98,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          gap: "18px",
          padding: "0 18px",
        }}
      >
        <Image src="/wakatime.png" alt="WakaTime Logo" width={80} height={80} />
        <div style={{ textAlign: "left", color: "white" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              display: "block",
            }}
          >
            {displayHours.toLocaleString()}+{" "}
            {translate.get(data!, "Info.hours")}
          </span>
          <span
            style={{
              fontSize: "15px",
              opacity: 0.8,
              display: "block",
            }}
          >
            {translate.get(data!, "Info.on")} WakaTime
          </span>
        </div>
      </div>
    </Link>
  );
};
