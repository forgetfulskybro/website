"use client";
import { LangSelect } from "@/components/LanguageSelect";
import { DiscordIcon, GithubIcon, SteamIcon, XIcon } from "@/icons/icons";
import Translate from "@/components/translation";
import ToolTip from "@/components/ToolTip";
import Page from "@/components/page";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";

export default function Home() {
  const data = LangSelect();

  const links: { url: string; src: ReactElement; alt: string }[] = [
    {
      url: "https://discord.gg/ty6Rsua",
      src: (
        <>
          <DiscordIcon />
        </>
      ),
      alt: "Discord",
    },
    {
      url: "https://github.com/forgetfulskybro",
      src: (
        <>
          <GithubIcon />
        </>
      ),
      alt: "GitHub",
    },
    {
      url: "https://x.com/ForGetFulSkyBro",
      src: (
        <>
          <XIcon />
        </>
      ),
      alt: "X.com",
    },
    {
      url: "https://steamcommunity.com/profiles/76561198827011761/",
      src: (
        <>
          <SteamIcon />
        </>
      ),
      alt: "Steam",
    },
  ];

  function calcAge(dateString: Date) {
    let birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  function birthday(date = "Jun 29") {
    if (Date().includes(date)) {
      return new Translate().get(data!, "Misc.page.birthday.today", {
        age: calcAge(new Date("2004-06-29 24:00:00")) + 1,
      });
    } else
      return new Translate().get(data!, "Misc.page.birthday.random", {
        age: calcAge(new Date("2004-06-29")),
      });
  }
  return (
    <main className="main">
      <Page>
        <div style={{ width: 550, marginTop: 25 }}>
          <div className="center flexGrid">
            <Image
              style={{ marginBottom: 15 }}
              className="hiding"
              src="/Me.png"
              height={140}
              width={140}
              draggable={false}
              alt="Avatar"
              priority
            />
          </div>
          <div className="sizing">
            {new Translate().get(data!, "Misc.page.descHello")}{" "}
            <strong className="Blue">ForGetFulSkyBro</strong>{" "}
            {new Translate().get(data!, "Misc.page.descOr")}{" "}
            <strong className="Blue">Sky</strong>{" "}
            {new Translate().get(data!, "Misc.page.descShort")}. {birthday()}{" "}
            {new Translate().get(data!, "Misc.page.desc", {
              date: calcAge(new Date("2019-07-03")),
            })}
          </div>
          <div
            style={{ marginTop: "20px", marginLeft: "10px" }}
            className="flexGrid centered"
          >
            {links.map((item) => (
              <Link key={item.alt} href={item.url} target="_blank">
                <ToolTip content={item.alt} placement="bottom">
                  <div
                    className="cardSocials"
                    data-platform={item.alt}
                  >
                    {item.src}
                  </div>
                </ToolTip>
              </Link>
            ))}
          </div>
        </div>

        <Image
          className="hide highlight"
          src="/Me.png"
          height={240}
          width={240}
          style={{ height: "auto", width: 240 }}
          draggable={false}
          alt="Avatar"
          priority
        />
      </Page>
    </main>
  );
}
