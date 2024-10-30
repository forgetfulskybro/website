"use client";
import { RecentGames } from "@/components/layout/RecentGames";
import { LangSelect } from "@/components/LanguageSelect";
import { LastFM } from "@/components/layout/LastFM";
import { Waka } from "@/components/layout/WakaTime";
import Translate from "@components/translation";
import Lyrics from "@/components/Lyrics";
import Page from "@/components/page";
import React from "react";

export default function Home() {
  const data = LangSelect();
  return (
    <main className="main">
      <Page>
        <div style={{ width: 750, marginTop: 15 }}>
          <div
            style={{ maxHeight: "30vh", marginBottom: "10px" }}
            className="flexGrid flex center"
          >
            <Lyrics>
              <LastFM data={data!} />
            </Lyrics>
            <Waka data={data!} />
          </div>
          <div className="boxes">
            {new Translate().get(data!, "Info.recent")}
          </div>
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
