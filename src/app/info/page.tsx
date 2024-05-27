"use client";
import { formatDistanceToNow, isYesterday } from "date-fns";
import type { Transition, Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import Translate from "@components/translation";
import { LastFMSong } from "@/hooks/LastFMSong";
import React, { useMemo } from "react";
import Page from "@/components/page";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [data, setData] = React.useState<string | null>("");
  const { artist, cover, date, title, year, playing, url } =
    LastFMSong() as any;

  React.useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (localStorage.getItem("language") !== data)
        return setData(localStorage.getItem("language"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [data]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      return setData(
        localStorage.getItem("language")
          ? localStorage.getItem("language")
          : "en_EN"
      );
    }
  }, []);

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const recentGames: {
    target: string;
    title: string;
    progress: boolean;
    image: string | null;
    myRating: number;
    tags: any[];
    website: string;
  }[] = [
    {
      target: "cy",
      title: "Cyberpunk 2077",
      progress: false,
      image: "/cyberpunk.ico",
      myRating: 8.7,
      tags: ["Cyberpunk", "Open World", "Sci-fi", "FPS", "RPG"],
      website: "https://www.cyberpunk.net/us/en/",
    },
    {
      target: "m",
      title: "Metro Exodus",
      progress: false,
      image: "/metro.png",
      myRating: 7.4,
      tags: ["Post-apocalyptic", "Singleplayer", "Open World", "FPS"],
      website: "https://www.metrothegame.com/en-us/",
    },
    {
      target: "got",
      title: "Ghost of Tsushima",
      progress: true,
      image: "/ghost.jpg",
      myRating: 8.9,
      tags: ["Story Rich", "Open World", "Adventure", "Action"],
      website: "https://www.suckerpunch.com/category/games/ghostoftsushima/",
    },
    {
      target: "hd",
      title: "Helldivers II",
      progress: false,
      image: "/helldivers.webp",
      myRating: 8,
      tags: ["Third-Person Shooter", "Multiplayer", "Online Co-Op"],
      website: "https://www.arrowheadgamestudios.com/aboutarrowhead/games/",
    },
  ];

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

  return (
    <main className="main">
      <Page>
        <div style={{ width: 750, marginTop: 15 }}>
          <div
            style={{ maxHeight: "30vh", marginBottom: "10px" }}
            className="flexGrid flex center"
          >
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
                      <time dateTime={absoluteDate.toISOString()}>
                        {relativeDate}
                      </time>
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
          </div>
          <div className="boxes">
            {new Translate().get(data!, "Info.recent")}
          </div>
          <div
            style={{ maxHeight: "80vh", fontSize: 10 }}
            className="flexGrid flex boxes"
          >
            {recentGames
              .sort((a, b) => b.myRating - a.myRating)
              .map((game) => (
                <Link href={game.website} key={game.target} target="_blank">
                  <div className="gameCard flex boxes">
                    {game.image && (
                      <Image
                        className="gameIcon"
                        src={game.image}
                        height={300}
                        width={300}
                        draggable={false}
                        alt="Game Icon"
                        priority={true}
                      />
                    )}
                    <div className="flex" style={{ flexDirection: "row" }}>
                      <div className="gameTitle">{game.title}</div>
                    </div>
                    <div className="flex" style={{ flexDirection: "row" }}>
                      <div className="gameRate">
                        {game.myRating}
                        {""}
                        <Image
                          src={`/star.svg`}
                          width={11}
                          height={11}
                          draggable={false}
                          alt={"Link"}
                          priority
                        />
                        /10{""}
                        <Image
                          src={`/star.svg`}
                          width={11}
                          height={11}
                          draggable={false}
                          alt={"Link"}
                          priority
                        />
                      </div>
                      {game.progress && (
                        <p className="gameProgress Blue">
                          {new Translate().get(data!, "Info.progress")}
                        </p>
                      )}
                    </div>
                    <div className="flex" style={{ flexDirection: "row" }}>
                      <div>
                        {game.tags.map((t) => (
                          <div key={t} className="gameTag">
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </Page>
    </main>
  );
}
