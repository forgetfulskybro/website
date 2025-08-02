"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { RecentGames } from "@/components/layout/RecentGames";
import { LangSelect } from "@/components/LanguageSelect";
import GameDrawer from "@/components/Drawers/GameDrawer";
import ToolTipCover from "@/components/ToolTipCover";
import { LastFM } from "@/components/layout/LastFM";
import { Waka } from "@/components/layout/WakaTime";
import React, { useState, useEffect } from "react";
import Translate from "@/components/translation";
import Lyrics from "@/components/Lyrics";
import Page from "@/components/page";
import Image from "next/image";

export default function Home() {
  const data = LangSelect();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRecentGamesClick = () => {
    setDrawerOpen(true);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 869);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()}></div>

      <Page>
        <div style={{ width: 750, marginTop: 15 }}>
          {isMobile && (
            <GameDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            />
          )}{" "}
          <div
            style={{ maxHeight: "30vh", marginBottom: "10px" }}
            className="flexGrid flex center"
          >
            <Lyrics>
              <LastFM data={data!} />
            </Lyrics>
            <Waka data={data!} />
          </div>
          <ToolTipCover
            placement="top"
            content={
              <div className="ratingsContainer">
                <h3>Game Rating Guide</h3>
                <dl className="ratingList">
                  {" "}
                  <dt>1</dt> <dd>Awful</dd>
                  <dt>5</dt> <dd>Mid/Average</dd>
                  <dt>10</dt> <dd>Amazing</dd>
                </dl>
              </div>
            }
          >
            <div
              className="boxes"
              style={{ display: "flex", alignItems: "center" }}
              onClick={handleRecentGamesClick}
            >
              {new Translate().get(data!, "Info.recent")}
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
