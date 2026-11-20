"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { RecentGames } from "@/components/layout/RecentGames";
import { RecentAnime } from "@/components/layout/RecentAnime";
import GameDrawer from "@/components/Drawers/GameDrawer";
import ToolTipCover from "@/components/ToolTipCover";
import { LastFM } from "@/components/layout/LastFM";
import { Waka } from "@/components/layout/WakaTime";
import { LastFMSong } from "@/hooks/LastFMSong";
import Lyrics from "@/components/Lyrics/Lyrics";
import AppShell from "@/components/pageNav/AppShell";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimeEntry } from "@/lib/anilist";

export default function InfoClient({ anime }: { anime: AnimeEntry[] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastFMSongData = LastFMSong();

  const handleRecentGamesClick = () => {
    setDrawerOpen(true);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 869);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()} />
      <AppShell>
        <div style={{ width: 750, marginTop: 15 }}>
          {isMobile && (
            <GameDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            />
          )}
          <div
            style={{ maxHeight: "30vh", marginBottom: "10px" }}
            className="flexGrid flex center"
          >
            <Lyrics lastFMSongData={lastFMSongData}>
              <LastFM lastFMSongData={lastFMSongData} />
            </Lyrics>
            <Waka />
          </div>
          <ToolTipCover
            placement="top"
            content={
              <div className="ratingsContainer">
                <h3 className="ratingsTitle">
                  Game Rating Guide
                </h3>
                <dl className="ratingList">
                  <div className="ratingItem">
                    <dt className="ratingScore">01</dt>
                    <dd className="ratingDescription">
                      Awful - Major Flaws
                    </dd>
                  </div>
                  <div className="ratingItem">
                    <dt className="ratingScore">05</dt>
                    <dd className="ratingDescription">
                      Average - Solid
                    </dd>
                  </div>
                  <div className="ratingItem">
                    <dt className="ratingScore">10</dt>
                    <dd className="ratingDescription">
                      Masterpiece
                    </dd>
                  </div>
                </dl>
              </div>
            }
          >
            <button
              type="button"
              className="boxes interactiveCardButton"
              style={{ display: "flex", alignItems: "center" }}
              onClick={handleRecentGamesClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (e.key === " ") e.preventDefault();
                  handleRecentGamesClick();
                }
              }}
            >
              Recent Games
              <Image
                style={{ opacity: 0.8, marginLeft: 5 }}
                src={`Info.svg`}
                width={15}
                height={15}
                draggable={false}
                alt={"Info"}
                priority
              />
            </button>
          </ToolTipCover>
          <div
            style={{ maxHeight: "80vh", fontSize: 14 }}
            className="flexGrid flex boxes"
          >
            <RecentGames />
          </div>

          <div className="animeSection">
            <div className="animeSectionHead">
              <span className="boxTitle">
                Recent Anime
              </span>
            </div>
            <div
              style={{ maxHeight: "80vh", fontSize: 14 }}
              className="flexGrid flex boxes"
            >
              {anime.length > 0 ? (
                <RecentAnime anime={anime} />
              ) : (
                <div className="animeEmpty">
                  No anime to show yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </AppShell>
    </main>
  );
}
