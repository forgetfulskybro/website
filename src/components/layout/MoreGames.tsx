"use client";
import type { Transition, Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import Translate from "@components/translation";
import Link from "next/link";

interface GameProps {
  data: string;
}

export const MoreGames: React.FC<GameProps> = ({ data }) => {

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
    <Link href={"/info/games"}>
      <div className="mgCard">
        <div className="mgDesc">
          {new Translate().get(data!, "Info.moreGames")}
        </div>

        <AnimatePresence>
          <motion.img
            alt={`More games`}
            draggable={false}
            animate="visible"
            className="mgBg"
            height={100}
            width={100}
            initial="hidden"
            loading="lazy"
            src={"/moregames.png"}
            transition={fade}
            variants={variants}
          />
        </AnimatePresence>
      </div>
    </Link>
  );
};
