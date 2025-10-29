import GameCardDrawer from "../Drawers/GameCardDrawer";
import { updateThemeColor } from "../updateThemeColor";
import React, { useEffect, useState } from "react";
import Translate from "@/components/translation";
import { defaultColors } from "../Lyrics/theme";
import ToolTipCover from "../ToolTipCover";
import { renderButtons } from "./Projects";
import { GameType } from "../GamesArray";
import ToolTip from "../ToolTip";
import Image from "next/image";

interface GamesProp {
  games: GameType[];
  data: string;
}

export const GameCard: React.FC<GamesProp> = ({ games, data }) => {
  const translate = new Translate();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [themeColors, setThemeColors] = useState(defaultColors);

  useEffect(() => {
    updateThemeColor(setThemeColors);
    const checkInterval = setInterval(
      () => updateThemeColor(setThemeColors),
      500
    );

    const storageHandler = (e: StorageEvent) => {
      if (e.key === "theme" || e.key === "customColor") {
        updateThemeColor(setThemeColors);
      }
    };

    window.addEventListener("storage", storageHandler);

    return () => {
      clearInterval(checkInterval);
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  const sortedGames = [...games].sort(
    (a, b) => (b.myRating || 0) - (a.myRating || 0)
  );

  const handleClick = (game: GameType) => {
    setSelectedGame(game);
    setDrawerOpen(true);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 869);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const truncate = (text: string | undefined) => {
    if (!text) return "";
    return text.length > 18 ? text.slice(0, 18) + ".." : text;
  };

  return (
    <>
      {sortedGames.map((game: GameType) => (
        <div key={game.target} onClick={() => handleClick(game)}>
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
              <ToolTip content={game.title} placement="top">
                <div className="gameTitle">{truncate(game.title)}</div>
              </ToolTip>
              <ToolTipCover
                content={
                  <div className="tooltip-container">
                    <div className="tooltip-section">
                      <h3 className="tooltip-title">
                        {translate.get(data!, "Games.review")}
                      </h3>
                      <div
                        className="tooltip-text-container"
                        style={{
                          maxHeight: "150px",
                          overflowY: "auto",
                        }}
                      >
                        <p className="tooltip-text">
                          {game && game?.review
                            ? translate.get(
                                data!,
                                `Games.${game.target}.review`
                              )
                            : translate.get(data!, "Games.noReview")}
                        </p>
                      </div>
                    </div>
                    <div className="tooltip-section">
                      <h3 className="tooltip-title">
                        {translate.get(data!, "Games.progress")}
                      </h3>
                      <p className="tooltip-text">
                        {translate.get(data!, `Games.${game?.target}.progress`)}
                      </p>
                    </div>
                    <div className="tooltip-section center">
                      {renderButtons(
                        game.website,
                        translate.get(data!, "Games.visit")
                      )}
                    </div>
                  </div>
                }
                placement="top"
              >
                <p
                  className="review Blue"
                  style={{
                    marginLeft:
                      {
                        en_EN: "190px",
                        fr_FR: "175px",
                        es_ES: "175px",
                        ds_DS: "200px",
                      }[data] || "180px",
                  }}
                >
                  {translate.get(data!, "Games.review")}
                </p>
              </ToolTipCover>
            </div>
            <div className="flex" style={{ flexDirection: "row" }}>
              <div className="gameRate">
                {game.myRating ? (
                  <>
                    <Image
                      src="/star.svg"
                      width={11}
                      height={11}
                      draggable={false}
                      alt="Rating star"
                      priority={false}
                    />
                    {game.myRating}
                    /10
                  </>
                ) : (
                  <p className="Blue">
                    {translate.get(data!, "Games.unrated")}
                  </p>
                )}
              </div>
            </div>
            <div className="flex" style={{ flexDirection: "row" }}>
              <div>
                {game.tags.map((t) => (
                  <div
                    key={t}
                    style={{ backgroundColor: `${themeColors.darker}` }}
                    className="gameTag"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {isMobile && (
        <GameCardDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          selectedGame={selectedGame}
          data={data}
        />
      )}
    </>
  );
};
