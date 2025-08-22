import React, { useEffect, useState } from "react";
import { GameType } from "../GamesArray";
import ToolTipCover from "../ToolTipCover";
import { renderButtons } from "./Projects";
import Image from "next/image";
import GameCardDrawer from "../Drawers/GameCardDrawer";

interface GamesProp {
  games: GameType[];
}

export const GameCard: React.FC<GamesProp> = ({ games }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

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
              <div className="gameTitle">{game.title}</div>
              <ToolTipCover
                content={
                  <div className="tooltip-container">
                    <div className="tooltip-section">
                      <h3 className="tooltip-title">Review</h3>
                      <div
                        className="tooltip-text-container"
                        style={{
                          maxHeight: "150px",
                          overflowY: "auto",
                        }}
                      >
                        <p className="tooltip-text">
                          {game.review
                            ? game.review
                            : "There is no review for this game."}
                        </p>
                      </div>
                    </div>
                    <div className="tooltip-section">
                      <h3 className="tooltip-title">Progress</h3>
                      <p className="tooltip-text">{game.progress}</p>
                    </div>
                    <div className="tooltip-section center">
                      {renderButtons(game.website, "Visit Website")}
                    </div>
                  </div>
                }
                placement="top"
              >
                <p className="review Blue">Review</p>
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
                  <p style={{ color: "#9F2AAA" }}>Unrated</p>
                )}
              </div>
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
        </div>
      ))}

      {isMobile && (
        <GameCardDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          selectedGame={selectedGame}
        />
      )}
    </>
  );
};
