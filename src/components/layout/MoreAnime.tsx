"use client";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MoreAnime: React.FC = () => {
  return (
    <Link href={"/info/anime"}>
      <m.div
        className="gameCard animeMoreCard flex boxes"
        whileHover="hover"
      >
        <div className="gameTitle animeMoreTitle">
          View more anime
        </div>
        <div className="animeMoreArrow">
          <Image
            src="/arrow.svg"
            width={20}
            height={20}
            alt="Arrow"
            priority
          />
        </div>
      </m.div>
    </Link>
  );
};
