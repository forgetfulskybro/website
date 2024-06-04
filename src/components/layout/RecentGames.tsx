"use client";
import Translate from "@components/translation";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface GamesProps {
  data: string;
}

export const RecentGames: React.FC<GamesProps> = ({data}) => {
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
  ];
  return (
    <>
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
    </>
  );
};
