"use client";
import { useShootingStars } from "@/components/ShootingStars";
import AppShell from "@/components/pageNav/AppShell";
import SocialLinks from "@/components/SocialLinks";
import Tooltip from "@/components/ToolTip";
import { LastFM } from "@/components/layout/LastFM";
import { Waka } from "@/components/layout/WakaTime";
import { LastFMSong } from "@/hooks/LastFMSong";
import Lyrics from "@/components/Lyrics/Lyrics";
import Image from "next/image";

export default function HomeClient() {
  const lastFMSongData = LastFMSong();

  function calcAge(dateString: Date) {
    const startDate = +new Date(dateString);
    return ~~((Date.now() - startDate) / 31557600000);
  }

  function birthday() {
    const d = new Date();
    const isToday = d.getMonth() === 5 && d.getDate() === 29;
    if (isToday) {
      const before = "Today is my birthday! I am ";
      const after = " years old.";
      const age = calcAge(new Date("2004-06-29 00:00:00")) + 1;
      return (
        <>
          {before}
          <Tooltip content="June 29th, 2004" placement="top">
            <strong style={{ textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#BA8D2B" }} className="Blue">{age}</strong>
          </Tooltip>
          {after}
        </>
      );
    }
    const before = "I'm currently ";
    const after = " years old";
    const age = calcAge(new Date("2004-06-29 00:00:00"));
    return (
      <>
        {before}
        <Tooltip content="June 29th, 2004" placement="top">
          <strong style={{ textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#BA8D2B" }} className="Blue">{age}</strong>
        </Tooltip>
        {after}
      </>
    );
  }

  const codingYears = calcAge(new Date("2019-07-03"));

  return (
    <main className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()} />

      <AppShell>
        <div className="homeLayout">
          <div className="homeHero">
            <div className="homeIntro">
              <div className="flexGrid centered">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "10%",
                    transition:
                      "opacity 0.25s ease-in-out, transform 0.25s ease-in-out, border-color 0.25s ease-in-out",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    className="hiding"
                    src="/DSG/DSG Forward Smirk.png"
                    height={140}
                    width={140}
                    draggable={false}
                    alt="Avatar"
                    priority
                  />
                </span>
              </div>
              <div className="sizing">
                Hello, my name is{" "}
                <Tooltip content="or ForGetFul" placement="top">
                  <strong style={{ textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#BA8D2B" }} className="Blue">ForGetFulSkyBro</strong>
                </Tooltip>
                {" or "}
                <strong className="Blue">Sky</strong> for short. {birthday()} and I&apos;ve
                been coding for{" "}
                <Tooltip content="August 3rd, 2019" placement="top">
                  <strong style={{ textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#BA8D2B" }} className="Blue">{codingYears}</strong>
                </Tooltip>{" "}
                years. I enjoy creating open source projects on my free time or
                whenever I&apos;m not lazy.
              </div>
              <div className="flexGrid centered homeSocials">
                <SocialLinks />
              </div>
            </div>
            <div className="homePortrait flexGrid centered">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "10%",
                  transition:
                    "opacity 0.25s ease-in-out, transform 0.25s ease-in-out, border-color 0.25s ease-in-out",
                }}
              >
                <Image
                  className="hide highlight"
                  src="/DSG/DSG Forward Smirk.png"
                  height={240}
                  width={240}
                  style={{ height: "auto", width: 200 }}
                  draggable={false}
                  alt="Avatar"
                  priority
                />
              </span>
            </div>
          </div>

          <div className="homeStatusRow">
            <div className="homeStatusItem">
              <Lyrics lastFMSongData={lastFMSongData}>
                <LastFM lastFMSongData={lastFMSongData} />
              </Lyrics>
            </div>
            <div className="homeStatusItem">
              <Waka />
            </div>
          </div>
        </div>
      </AppShell>
    </main>
  );
}
