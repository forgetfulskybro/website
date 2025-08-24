"use client";
import { formatDistanceToNow, isYesterday, setDefaultOptions } from "date-fns";
import type { Transition, Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { Response } from "@/app/api/lastfm/LastFMData";
import Translate from "@/components/translation";
import { es, fr } from "date-fns/locale";
import { useMemo } from "react";
import Image from "next/image";
import React from "react";

interface LastFMProps {
  data: string;
  lastFMSongData: Response
}

export const LastFM: React.FC<LastFMProps> = ({ data, lastFMSongData }) => {
  const { artist, cover, date, title, playing } = lastFMSongData;

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
      y: 10,
      zIndex: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      zIndex: 100,
    },
  };

  const fade: Transition = {
    ease: "easeInOut",
    duration: 0.6,
  };

  return (
    <div style={{ cursor: "pointer" }} className="gameCard flex">
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
          {playing && (
            <Image
              src="/music.svg"
              className="musicIcon"
              height={20}
              width={20}
              draggable={false}
              alt="Music"
              priority={true}
            />
          )}
          {absoluteDate ? (
            <time dateTime={absoluteDate.toISOString()}>{relativeDate}</time>
          ) : (
            <span>
              {playing ? (
                `${new Translate().get(data!, "Info.listening")}...`
              ) : (
                <svg
                  className="container"
                  x="0px"
                  y="0px"
                  viewBox="0 0 50 31.25"
                  height="31.25"
                  width="50"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    className="track"
                    strokeWidth="4"
                    fill="none"
                    pathLength="100"
                    d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
                  />

                  <path
                    className="car"
                    strokeWidth="4"
                    fill="none"
                    pathLength="100"
                    d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
                  />
                </svg>
              )}
            </span>
          )}
        </div>
      </div>

      <div className="flex" style={{ flexDirection: "row" }}>
        <AnimatePresence mode="wait">
          <motion.div
            className="lastFMTitle"
            animate="visible"
            initial="hidden"
            exit="hidden"
            key={`${artist} ${title}-title`}
            transition={fade}
            variants={variants}
          >
            <b>{title?.slice(0, 55)}</b>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex" style={{ flexDirection: "row" }}>
        <AnimatePresence mode="wait">
          <motion.div
            className="lastFMArtist"
            animate="visible"
            initial="hidden"
            exit="hidden"
            key={`${artist} ${title}-artist`}
            transition={fade}
            variants={variants}
          >
            {artist}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
