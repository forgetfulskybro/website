import ToolTip from "@/components/ToolTipCover";
import Translate from "@components/translation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectProps {
  data: string;
}

export const ProjectCards: React.FC<ProjectProps> = ({ data }) => {
  const darkenColor = (color: string) => {
    // Remove the '#' and split into RGB components
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Darken by reducing each component by 30%
    const darkerR = Math.floor(r * 0.7);
    const darkerG = Math.floor(g * 0.7);
    const darkerB = Math.floor(b * 0.7);

    // Convert back to hex
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  };

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
        end: new Translate().get(data!, "Projects.footer.endPresent"),
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
        end: new Translate().get(data!, "Projects.footer.endPresent"),
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
          name: new Translate().get(data!, "Projects.tags.website"),
          color: "#3B3E40",
        },
        {
          name: new Translate().get(data!, "Projects.tags.application"),
          color: "#533374",
        },
      ],
      footer: {
        start: "Jul 17, 2023",
        end: new Translate().get(data!, "Projects.footer.endPresent"),
      },
      flags: [
        {
          name: new Translate().get(data!, "Projects.flags.contrib"),
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
          name: new Translate().get(data!, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Jul 2, 2023",
        end: new Translate().get(data!, "Projects.footer.endPresent"),
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
          name: new Translate().get(data!, "Projects.flags.discon"),
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
          name: new Translate().get(data!, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Apr 12, 2023",
        end: "Sep 19, 2023",
      },
      flags: [
        {
          name: new Translate().get(data!, "Projects.flags.contrib"),
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
          name: new Translate().get(data!, "Projects.flags.discon"),
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
          name: new Translate().get(data!, "Projects.flags.discon"),
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
          name: new Translate().get(data!, "Projects.flags.contrib"),
          color: "#4ca6ca",
        },
        {
          name: new Translate().get(data!, "Projects.flags.discon"),
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
          name: new Translate().get(data!, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Dec 10, 2020",
        end: new Translate().get(data!, "Projects.footer.endUnknown"),
      },
      flags: [
        {
          name: new Translate().get(data!, "Projects.flags.contrib"),
          color: "#4ca6ca",
        },
        {
          name: new Translate().get(data!, "Projects.flags.discon"),
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
          name: new Translate().get(data!, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Apr 1, 2022",
        end: "Apr 1, 2022",
      },
      flags: [
        {
          name: new Translate().get(data!, "Projects.flags.contrib"),
          color: "#4ca6ca",
        },
        {
          name: new Translate().get(data!, "Projects.flags.discon"),
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
          name: new Translate().get(data!, "Projects.tags.website"),
          color: "#3B3E40",
        },
      ],
      footer: {
        start: "Jul 03, 2019",
        end: "Jun 12, 2023",
      },
      flags: [
        {
          name: new Translate().get(data!, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: null,
      community: "https://discord.gg/ty6Rsua",
      website: null,
    },
  ];

  return (
    <>
      {array.map((project) => (
        <ToolTip
          key={project.target}
          placement="top"
          content={
            <div className="projectTooltip">
              {project.github ? (
                <Link href={project.github} target="_blank">
                  <button className="tooltipButton">GitHub</button>
                </Link>
              ) : (
                <button className="tooltipButton" disabled>
                  GitHub
                </button>
              )}
              {project.community ? (
                <Link href={project.community} target="_blank">
                  <button className="tooltipButton">
                    {new Translate().get(data!, "Projects.buttons.community")}
                  </button>
                </Link>
              ) : (
                <button className="tooltipButton" disabled>
                  {new Translate().get(data!, "Projects.buttons.community")}
                </button>
              )}
              {project.website ? (
                <Link href={project.website} target="_blank">
                  <button className="tooltipButton">
                    {new Translate().get(data!, "Projects.buttons.website")}
                  </button>
                </Link>
              ) : (
                <button className="tooltipButton" disabled>
                  {new Translate().get(data!, "Projects.buttons.website")}
                </button>
              )}
            </div>
          }
        >
          <div className="projectCard flex relative">
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
              <a style={{ marginLeft: 0.7, marginTop: 1.3 }}>{project.title}</a>
            </div>
            <div className="projectDesc">
              {new Translate().get(
                data!,
                `Projects.list.${project.target}.desc`
              )}
            </div>
            <div className="tags">
              {project.tags.map((tag) => (
                <div
                  key={tag.name}
                  style={{ 
                    backgroundColor: darkenColor(tag.color),
                    padding: '0.35rem',
                    borderRadius: '5px'
                  }}
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
            </div>
            {project.flags.length > 0 && (
              <>
                {project.flags.map((flag, index) => {
                  const isContrib = flag.name === new Translate().get(data!, "Projects.flags.contrib");
                  const isDiscon = flag.name === new Translate().get(data!, "Projects.flags.discon");
                  return (
                    <span
                      key={flag.name}
                      style={{
                        color: flag.color,
                        fontWeight: 1000,
                        position: 'absolute',
                        right: '0.75rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        ...(isContrib ? { top: '0.75rem' } : {}),
                        ...(isDiscon ? { bottom: '0.75rem' } : {}),
                      }}
                    >
                      {flag.name}
                    </span>
                  );
                })}
              </>
            )}
          </div>
        </ToolTip>
      ))}
    </>
  );
};
