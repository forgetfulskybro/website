import GameCardDrawer from "../Drawers/GameCardDrawer";
import React, { useEffect, useState } from "react";
import { defaultColors } from "../Lyrics/theme";
import { GameViewer } from "./GameViewer";
import { GameType } from "../GamesArray";
import ToolTip from "../ToolTip";
import Image from "next/image";

interface GamesProp {
  games: GameType[];
}

export const GameCard: React.FC<GamesProp> = ({ games }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const themeColors = defaultColors;

  const sortedGames = games.toSorted(
    (a, b) => (b.myRating || 0) - (a.myRating || 0)
  );

  const handleClick = (game: GameType) => {
    setSelectedGame(game);
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
        <button
          type="button"
          key={game.target}
          className="gameCard flex boxes interactiveCardButton"
          onClick={() => handleClick(game)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(game);
            }
          }}
        >
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
                    Unrated
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
        </button>
      ))}

      {selectedGame && (
        <>
          {isMobile ? (
            <GameCardDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              selectedGame={selectedGame}
            />
          ) : (
            <GameViewer
              open={dialogOpen}
              onClose={handleCloseDialog}
              game={selectedGame}
              themeColors={themeColors}
            />
          )}
        </>
      )}
    </>
  );
};
