"use client";
import { formatDistanceToNow, isYesterday, setDefaultOptions } from "date-fns";
import type { Transition, Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import Translate from "@components/translation";
import { LastFMSong } from "@/hooks/LastFMSong";
import { es, fr } from "date-fns/locale";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LastFMProps {
  data: string;
}

export const LastFM: React.FC<LastFMProps> = ({ data }) => {
  const { artist, cover, date, title, playing, url } = LastFMSong();

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (data == "es_ES") setDefaultOptions({ locale: es });
  else if (data == "fr_FR") setDefaultOptions({ locale: fr });

  const absoluteDate = useMemo(() => {
    if (!date) return;

    return new Date(date * 1000);
  }, [date]);
  const relativeDate = useMemo(() => {
    if (!absoluteDate) return;

    return isYesterday(absoluteDate)
      ? new Translate().get(data!, "Info.yester")
      : capitalize(formatDistanceToNow(absoluteDate, { addSuffix: true }));
  }, [absoluteDate, data]);

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
    <Link href={url ? url : "https://example.com"} target="_blank">
      <div className="gameCard flex">
        {cover ? (
          <AnimatePresence>
            {cover && (
              <motion.img
                alt={`${title} by ${artist}`}
                draggable={false}
                animate="visible"
                className="gameIcon"
                height={100}
                width={100}
                initial="hidden"
                key={`${artist} ${title}`}
                loading="lazy"
                src={cover}
                transition={fade}
                variants={variants}
              />
            )}
          </AnimatePresence>
        ) : (
          <Image
            className="gameIcon"
            src={"/music.png"}
            height={100}
            width={100}
            draggable={false}
            alt="Skele"
            priority={true}
          />
        )}
        <div className="flex" style={{ flexDirection: "row" }}>
          <div className="lastFMTop">
            <Image
              src={"/music.svg"}
              className="musicIcon"
              height={20}
              width={20}
              draggable={false}
              alt="Music"
              priority={true}
            />
            {absoluteDate ? (
              <time dateTime={absoluteDate.toISOString()}>{relativeDate}</time>
            ) : (
              <span>
                {playing
                  ? `${new Translate().get(data!, "Info.listening")}...`
                  : new Translate().get(data!, "Info.playing")}
              </span>
            )}
          </div>
        </div>
        <div className="flex" style={{ flexDirection: "row" }}>
          <div className="lastFMTitle">
            <b>{title}</b>
          </div>
        </div>
        <div className="flex" style={{ flexDirection: "row" }}>
          <div className="lastFMArtist">{artist}</div>
        </div>
      </div>
    </Link>
  );
};
