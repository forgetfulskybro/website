"use client";
import { formatDistanceToNow, isYesterday, setDefaultOptions } from "date-fns";
import type { Transition, Variants } from "framer-motion";
import { AnimatePresence, m } from "framer-motion";
import { Response } from "@/app/api/lastfm/LastFMData";
import { enUS } from "date-fns/locale";
import { useMemo } from "react";
import Image from "next/image";
import React from "react";

interface LastFMProps {
  lastFMSongData: Response;
}

export const LastFM: React.FC<LastFMProps> = ({ lastFMSongData }) => {
  const { artist, cover, date, title, playing } = lastFMSongData;

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setDefaultOptions({ locale: enUS });

  const absoluteDate = useMemo(() => {
    if (!date) return;

    return new Date(date * 1000);
  }, [date]);

  const relativeDate = useMemo(() => {
    if (!absoluteDate) return;

    return isYesterday(absoluteDate)
      ? "Yesterday"
      : capitalize(formatDistanceToNow(absoluteDate, { addSuffix: true }));
  }, [absoluteDate]);

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

  const MotionImage = m(Image);

  return (
    <div className="homeStatusCard homeMusicCard">
      {cover ? (
        <AnimatePresence>
          {cover && (
            <m.img
              alt={`${title} by ${artist}`}
              draggable={false}
              animate="visible"
              className="homeStatusCover"
              height={72}
              width={72}
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
          className="homeStatusCover"
          src={"/music.png"}
          height={72}
          width={72}
          draggable={false}
          alt="Music"
          priority={true}
        />
      )}

      <div className="homeStatusBody">
        <div className="homeStatusTop">
          <AnimatePresence>
            {playing && (
              <MotionImage
                src="/music.svg"
                className="homeStatusIcon"
                height={16}
                width={16}
                draggable={false}
                alt="Music"
                priority={true}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                transition={fade}
              />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {absoluteDate ? (
              <m.time
                dateTime={absoluteDate.toISOString()}
                animate="visible"
                initial="hidden"
                exit="hidden"
                key={`date-${date}`}
                transition={fade}
                variants={variants}
              >
                {relativeDate}
              </m.time>
            ) : playing ? (
              <m.span
                animate="visible"
                initial="hidden"
                exit="hidden"
                key="listening"
                transition={fade}
                variants={variants}
              >
                Listening to...
              </m.span>
            ) : (
              <m.svg
                className="homeStatusEqualizer"
                x="0px"
                y="0px"
                viewBox="0 0 50 31.25"
                height="31.25"
                width="50"
                preserveAspectRatio="xMidYMid meet"
                animate="visible"
                initial="hidden"
                exit="hidden"
                key="equalizer"
                transition={fade}
                variants={variants}
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
              </m.svg>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <m.div
            className="homeStatusTitle"
            animate="visible"
            initial="hidden"
            exit="hidden"
            key={`${artist} ${title}-title`}
            transition={fade}
            variants={variants}
          >
            {title?.slice(0, 55)}
          </m.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <m.div
            className="homeStatusArtist"
            animate="visible"
            initial="hidden"
            exit="hidden"
            key={`${artist} ${title}-artist`}
            transition={fade}
            variants={variants}
          >
            {artist}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
