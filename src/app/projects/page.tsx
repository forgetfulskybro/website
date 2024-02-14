"use client";
import { usePathname } from "next/navigation";
import ToolTip from "@/components/ToolTipCover";
import Translate from "@components/translation";
import Page from "@/components/page";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction } from "react";

export default function Projects() {
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

  const array: {
    target: string;
    title: string;
    image: string | null;
    tags: any[];
    footer: { start: string; end: string };
    flags: any[];
    github: string | null;
    website: string | null;
    community: string | null;
  }[] = [
    {
      target: "WY",
      title: "Would You",
      image: "/WouldYou.svg",
      tags: [{ name: "Discord Bot", color: "#5764F3" }],
      footer: {
        start: "Aug 22, 2022",
        end: new Translate().get(data, "Projects.footer.endPresent"),
      },
      flags: [],
      github: "https://github.com/Would-You-Bot",
      community: "https://wouldyoubot.gg/discord",
      website: "https://wouldyoubot.gg",
    },
    {
      target: "SB",
      title: "Support Bot",
      image: "/Support.png",
      tags: [{ name: "Discord Bot", color: "#5764F3" }],
      footer: {
        start: "Sep 30, 2022",
        end: new Translate().get(data, "Projects.footer.endPresent"),
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/Support-Bot",
      community: "https://discord.gg/ty6Rsua",
      website: null,
    },
    {
      target: "SC",
      title: "Strafe.chat",
      image: "https://strafe.chat/favicon.ico",
      tags: [
        {
          name: new Translate().get(data, "Projects.tags.website"),
          color: "#3B3E40",
        },
        {
          name: new Translate().get(data, "Projects.tags.application"),
          color: "#533374",
        },
      ],
      footer: {
        start: "Jul 17, 2023",
        end: new Translate().get(data, "Projects.footer.endPresent"),
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.contrib"),
          color: "#4ca6ca",
        },
      ],
      github: "https://github.com/strafechat",
      community: "https://discord.gg/yC4qw79qRa",
      website: "https://strafe.chat",
    },
    {
      target: "W",
      title: "Personal Website",
      image: null,
      tags: [
        {
          name: new Translate().get(data, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Jul 2, 2023",
        end: new Translate().get(data, "Projects.footer.endPresent"),
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/website",
      community: "https://discord.gg/ty6Rsua",
      website: "/",
    },
    {
      target: "F",
      title: "Functious",
      image: "/Functious.png",
      tags: [{ name: "Revolt Bot", color: "#FE4654" }],
      footer: {
        start: "Feb 18, 2023",
        end: "Sep 19, 2023",
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: "https://github.com/forgetfulskybro/Revolt-Functious",
      community: null,
      website: null,
    },
    {
      target: "RBL",
      title: "Revolt Bot List",
      image: "/Revoltbots.png",
      tags: [
        { name: "Revolt Bot", color: "#FE4654" },
        {
          name: new Translate().get(data, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Apr 12, 2023",
        end: "Sep 19, 2023",
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.contrib"),
          color: "#4ca6ca",
        },
      ],
      github: "https://github.com/BrydenIsNotSmart/Revolt-Bot-List",
      community: "https://revoltbots.org/server",
      website: "https://revoltbots.org",
    },
    {
      target: "RM",
      title: "Revolt Modmail",
      image: null,
      tags: [{ name: "Revolt Bot", color: "#FE4654" }],
      footer: {
        start: "Feb 4, 2023",
        end: "Sep 19, 2023",
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: "https://github.com/forgetfulskybro/Revolt-Modmail",
      community: null,
      website: null,
    },
    {
      target: "RB",
      title: "Revolt Bridge",
      image: null,
      tags: [{ name: "Revolt Bot", color: "#FE4654" }],
      footer: {
        start: "Feb 7, 2023",
        end: "Sep 19, 2023",
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: "https://github.com/forgetfulskybro/Revolt-Bridge",
      community: null,
      website: null,
    },
    {
      target: "D",
      title: "Durchie",
      image: "/Durchie.png",
      tags: [{ name: "Discord Bot", color: "#5764F3" }],
      footer: {
        start: "Jun 1, 2021",
        end: "Jun 9,2022",
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.contrib"),
          color: "#4ca6ca",
        },
        {
          name: new Translate().get(data, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: null,
      community: "https://discord.gg/utilibots-618115853178634240",
      website: null,
    },
    {
      target: "AYB",
      title: "AYB",
      image: "/Ayb.png",
      tags: [
        { name: "Discord Bot", color: "#5764F3" },
        {
          name: new Translate().get(data, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Dec 10, 2020",
        end: new Translate().get(data, "Projects.footer.endUnknown"),
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.contrib"),
          color: "#4ca6ca",
        },
        {
          name: new Translate().get(data, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: "https://github.com/AYB-Archive",
      community: null,
      website: "https://ayblisting.com",
    },
    {
      target: "L",
      title: "Luau.gg",
      image: "/Luau.jpg",
      tags: [
        {
          name: new Translate().get(data, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Apr 1, 2022",
        end: "Apr 1, 2022",
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.contrib"),
          color: "#4ca6ca",
        },
        {
          name: new Translate().get(data, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: "https://github.com/SamOphis",
      community: null,
      website: null,
    },
    {
      target: "FGF",
      title: "ForGetFul",
      image: "/Forgetful.png",
      tags: [
        { name: "Discord Bot", color: "#5764F3" },
        {
          name: new Translate().get(data, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Jul 03, 2019",
        end: "Jun 12, 2023",
      },
      flags: [
        {
          name: new Translate().get(data, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: null,
      community: "https://discord.gg/ty6Rsua",
      website: null,
    },
  ];

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div
          style={{ marginRight: 10, maxHeight: "80vh" }}
          className="flexGrid"
        >
          {array.map((project) => (
            <ToolTip
              key={project.target}
              placement="top"
              content={
                <div
                  style={{
                    backgroundColor: "#595959",
                    border: "2px 2px 2px 2px #595959",
                    borderRadius: "5px",
                  }}
                  className="flexGrid center"
                >
                  {project.github ? (
                    <Link href={project.github} target="_blank">
                      <button className="button">GitHub</button>
                    </Link>
                  ) : (
                    <button className="button disable" disabled>
                      GitHub
                    </button>
                  )}

                  {project.community ? (
                    <Link href={project.community} target="_blank">
                      <button className="button">
                        {new Translate().get(
                          data,
                          "Projects.buttons.community"
                        )}
                      </button>
                    </Link>
                  ) : (
                    <button className="button disable" disabled>
                      {new Translate().get(data, "Projects.buttons.community")}
                    </button>
                  )}

                  {project.website ? (
                    <Link href={project.website} target="_blank">
                      <button className="button">
                        {new Translate().get(data, "Projects.buttons.website")}
                      </button>
                    </Link>
                  ) : (
                    <button className="button disable" disabled>
                      {new Translate().get(data, "Projects.buttons.website")}
                    </button>
                  )}
                </div>
              }
            >
              <div className="projectCard flex">
                <div className="projectTitle">
                  {project.image && (
                    <Image
                      className="img"
                      src={project.image}
                      height={25}
                      width={25}
                      draggable={false}
                      alt="ProjectName"
                      priority
                    />
                  )}
                  <a style={{ marginLeft: 0.7, marginTop: 1.3 }}>
                    {project.title}
                  </a>
                </div>
                <div className="projectDesc">
                  {new Translate().get(
                    data,
                    `Projects.list.${project.target}.desc`
                  )}
                </div>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <div
                      key={tag.name}
                      style={{ backgroundColor: tag.color, padding: "0.2rem" }}
                      className="projectTags"
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
                <div className="projectFooter">
                  {project.footer.start} <a style={{ color: "#6A6969" }}>-</a>{" "}
                  <a style={{ color: "white", fontWeight: 1000 }}>
                    {project.footer.end}
                  </a>
                  {project.flags.length > 0 &&
                    project.flags.map((e) => (
                      <a
                        key={e.name}
                        style={{
                          color: e.color,
                          fontWeight: 1000,
                          marginLeft: 10,
                        }}
                      >
                        {e.name}
                      </a>
                    ))}
                </div>
              </div>
            </ToolTip>
          ))}
        </div>
      </Page>
    </main>
  );
}
