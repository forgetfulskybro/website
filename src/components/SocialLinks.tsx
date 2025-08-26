import { DiscordIcon, GithubIcon, SteamIcon, XIcon } from "@/icons/icons";
import React, { ReactElement } from "react";
import ToolTip from "./ToolTip";
import Link from "next/link";

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

export default function SocialLinks() {
  return (
    <>
      <div className="hiding flexGrid center" style={{ paddingBottom: "15px", paddingTop: "15px" }}>
        <div className="socialLinks">
          {links.map((item, index) => (
            <div
              key={item.alt}
              style={{ marginRight: index < links.length - 1 ? "12px" : "0" }}
            >
              <Link href={item.url} target="_blank">
                <ToolTip content={item.alt} placement="top">
                  <span
                    className="cardSocials"
                    data-platform={item.alt}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "transparent",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "35%",
                      height: "30px",
                      width: "30px",
                      transition: "all 0.25s ease-in-out",
                    }}
                  >
                    {item.src}
                  </span>
                </ToolTip>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
