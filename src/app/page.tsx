"use client";
import Translate from "@components/translation";
import ToolTip from "@/components/ToolTip";
import Page from "@/components/page";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction } from "react";

export default function Home() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    const handleStorageChange = (event: any) => {
      if ((localStorage.getItem("language") as SetStateAction<string>) !== data)
        return setData(
          localStorage.getItem("language") as SetStateAction<string>
        );
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [data]);

  React.useEffect(() => {
    return setData(
      (localStorage.getItem("language") as SetStateAction<string>)
        ? (localStorage.getItem("language") as SetStateAction<string>)
        : "en_EN"
    );
  }, []);

  const links: { url: string; src: string; alt: string }[] = [
    {
      url: "https://discord.gg/ty6Rsua",
      src: "Discord.svg",
      alt: "Discord",
    },
    {
      url: "https://github.com/forgetfulskybro",
      src: "Github.svg",
      alt: "GitHub",
    },
    {
      url: "https://x.com/ForGetFulSkyBro",
      src: "/X.jpg",
      alt: "X.com",
    },
    {
      url: "https://steamcommunity.com/profiles/76561198827011761/",
      src: "Steam.svg",
      alt: "Steam",
    },
  ];

  function calcAge(dateString: Date) {
    let birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  function birthday(date = "Jun 29") {
    if (Date().includes(date)) {
      return new Translate().get(data, "Misc.page.birthday.today", {
        age: calcAge(new Date("2004-06-28")),
      });
    } else
      return new Translate().get(data, "Misc.page.birthday.random", {
        age: calcAge(new Date("2004-06-28")),
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
            {new Translate().get(data, "Misc.page.descHello")}{" "}
            <strong className="Blue">ForGetFulSkyBro</strong>{" "}
            {new Translate().get(data, "Misc.page.descOr")}{" "}
            <strong className="Blue">Sky</strong>{" "}
            {new Translate().get(data, "Misc.page.descShort")}. {birthday()}{" "}
            {new Translate().get(data, "Misc.page.desc", {
              date: calcAge(new Date("2019-07-03")),
            })}{" "}
            <Link
              className="link"
              target="_blank"
              href="https://google.com/search?q=turtles"
            >
              {new Translate().get(data, "Misc.page.turtles")}
            </Link>{" "}
            &{" "}
            <Link
              className="link"
              target="_blank"
              href="https://google.com/search?q=capybaras"
            >
              {new Translate().get(data, "Misc.page.capybaras")}
            </Link>
            .
          </div>
          <div style={{ marginTop: "20px" }} className="flexGrid centered">
            {links.map((item) => (
              <Link key={item.alt} href={item.url} target="_blank">
                <ToolTip content={item.alt} placement="bottom">
                  <div className="cardSocials flex">
                    <Image
                      className="img"
                      style={{ marginTop: 5 }}
                      src={item.src}
                      width={37}
                      height={37}
                      draggable={false}
                      alt={item.alt}
                      priority
                    />
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
          draggable={false}
          alt="Avatar"
          priority
        />
      </Page>
    </main>
  );
}
