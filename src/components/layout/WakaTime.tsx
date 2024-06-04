"use client";
import { WakaResponse } from "../../app/api/wakatime/wakatimeData";
import type { Transition, Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import Translate from "@components/translation";
import { WakaTime } from "@/hooks/WakaTime";
import Link from "next/link";

interface WakaProps {
  data: string;
}

export const Waka: React.FC<WakaProps> = ({ data }) => {
  const { seconds } = WakaTime() as WakaResponse;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      zIndex: 0,
    },
    visible: {
      opacity: 1,
      zIndex: 100,
    },
  };

  const fade: Transition = {
    ease: "easeInOut",
    duration: 0.6,
  };

  return (
    <Link href={"https://wakatime.com/@ForGetFulSkyBro"} target="_blank">
      <div className="wakaCard">
        <div className="wakaHours">
          {!isNaN(seconds) ? Math.round(seconds / 3600).toLocaleString() : "0"}+{" "}{new Translate().get(data!, "Info.hours")}{" "}WakaTime
        </div>

        <AnimatePresence>
          <motion.img
            alt={`wakatime`}
            draggable={false}
            animate="visible"
            className="wakaBg"
            height={100}
            width={100}
            initial="hidden"
            loading="lazy"
            src={"/wakatime.png"}
            transition={fade}
            variants={variants}
          />
        </AnimatePresence>
      </div>
    </Link>
  );
};
