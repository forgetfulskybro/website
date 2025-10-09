"use client";
import Translate from "@/components/translation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface GameProps {
  data: string;
}

export const MoreGames: React.FC<GameProps> = ({ data }) => {
  return (
    <Link href={"/info/games"}>
      <motion.div
        className="gameCard flex boxes"
        style={{
          width: 335,
          height: 93.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
        whileHover="hover"
      >
        <div
          className="gameTitle"
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          {new Translate().get(data!, "Info.moreGames")}
        </div>
        <div
          style={{
            position: "relative",
            top: "10px",
            marginLeft: "-15px",
            padding: "4px",
          }}
        >
          <Image
            src="/arrow.svg"
            width={20}
            height={20}
            alt="Arrow"
            priority
            style={{
              transform: "rotate(-90deg) translateX(6px)",
            }}
          />
        </div>
      </motion.div>
    </Link>
  );
};
