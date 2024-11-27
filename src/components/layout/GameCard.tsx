import Translate from "@components/translation";
import { GameType } from "../GamesArray";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ToolTip from "../ToolTip";

interface GamesProp {
  data: string;
  games: GameType[];
}

export const GameCard: React.FC<GamesProp> = ({ data, games }) => {
  return (
    <>
      {games
        ?.sort((a: GameType, b: GameType) => b.myRating! - a.myRating!)
        .map((game: GameType) => (
          <Link href={game.website} key={game.target} target="_blank">
            <div className="gameCard flex boxes">
              {game.image && (
                <Image
                  className="gameIcon"
                  src={game.image}
                  height={150}
                  width={150}
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
                  {game.myRating ? (
                    <>
                      {game.myRating}
                      {""}
                      <Image
                        src={`/star.svg`}
                        width={11}
                        height={11}
                        draggable={false}
                        alt="Rating star"
                        priority={false}
                      />
                      /10{""}
                      <Image
                        src={`/star.svg`}
                        width={11}
                        height={11}
                        draggable={false}
                        alt="Rating star"
                        priority={false}
                      />
                    </>
                  ) : (
                    <p style={{ color: "#9F2AAA" }}>Unrated</p>
                  )}
                </div>
                <ToolTip content={game.progress} placement="top">
                  <p className="gameProgress Blue">
                    Progress
                  </p>
                </ToolTip>
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
