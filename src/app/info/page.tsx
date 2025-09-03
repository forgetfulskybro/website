"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { RecentGames } from "@/components/layout/RecentGames";
import { LangSelect } from "@/components/LanguageSelect";
import GameDrawer from "@/components/Drawers/GameDrawer";
import ToolTipCover from "@/components/ToolTipCover";
import { LastFM } from "@/components/layout/LastFM";
import { Waka } from "@/components/layout/WakaTime";
import Translate from "@/components/translation";
import { LastFMSong } from "@/hooks/LastFMSong";
import Lyrics from "@/components/Lyrics/Lyrics";
import Page from "@/components/pageNav/page";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const translate = new Translate();
  const data = LangSelect();
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
      <Page>
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
              <LastFM data={data!} lastFMSongData={lastFMSongData} />
            </Lyrics>
            <Waka data={data!} />
          </div>
          <ToolTipCover
            placement="top"
            content={
              <div className="ratingsContainer">
                <h3 className="ratingsTitle">
                  {translate.get(data!, "Info.gameRating")}
                </h3>
                <dl className="ratingList">
                  <div className="ratingItem">
                    <dt className="ratingScore">01</dt>
                    <dd className="ratingDescription">
                      {translate.get(data!, "Info.awful")}
                    </dd>
                  </div>
                  <div className="ratingItem">
                    <dt className="ratingScore">05</dt>
                    <dd className="ratingDescription">
                      {translate.get(data!, "Info.mid")}
                    </dd>
                  </div>
                  <div className="ratingItem">
                    <dt className="ratingScore">10</dt>
                    <dd className="ratingDescription">
                      {translate.get(data!, "Info.top")}
                    </dd>
                  </div>
                </dl>
              </div>
            }
          >
            <div
              className="boxes"
              style={{ display: "flex", alignItems: "center" }}
              onClick={handleRecentGamesClick}
            >
              {translate.get(data!, "Info.recent")}
              <Image
                style={{ opacity: 0.8, marginLeft: 5 }}
                src={`Info.svg`}
                width={15}
                height={15}
                draggable={false}
                alt={"Info"}
                priority
              />
            </div>
          </ToolTipCover>
          <div
            style={{ maxHeight: "80vh", fontSize: 10 }}
            className="flexGrid flex boxes"
          >
            <RecentGames data={data!} />
          </div>
        </div>
      </Page>
    </main>
  );
}
