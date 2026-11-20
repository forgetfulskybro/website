enum TagType {
  DiscordBot = "Discord Bot",
  RevoltBot = "Revolt Bot",
  Website = "Website",
  Application = "Application",
  FluxerBot = "Fluxer Bot",
}

export enum FlagType {
  Contribution = "Contribution",
  Discontinued = "Discontinued",
}

const tagTypeColorMap: Record<TagType, string> = {
  [TagType.DiscordBot]: "#5764F3",
  [TagType.RevoltBot]: "#FE4654",
  [TagType.Website]: "#3B3E40",
  [TagType.Application]: "#533374",
  [TagType.FluxerBot]: "#4742D9",
};

const flagTypeColorMap: Record<FlagType, string> = {
  [FlagType.Contribution]: "#4ca6ca",
  [FlagType.Discontinued]: "#CC222A",
};

const tagTypeConversionMap = new Map<TagType, string>([
  [TagType.DiscordBot, "discord"],
  [TagType.RevoltBot, "revolt"],
  [TagType.Website, "website"],
  [TagType.Application, "application"],
  [TagType.FluxerBot, "fluxer"],
]);

const flagTypeConversionMap = new Map<FlagType, string>([
  [FlagType.Contribution, "contrib"],
  [FlagType.Discontinued, "discon"],
]);

export function TagTypeConvert(type: TagType): string {
  return tagTypeConversionMap.get(type) || "";
}

export function FlagTypeConvert(type: FlagType): string {
  return flagTypeConversionMap.get(type) || "";
}

export interface ProjectData {
  target: string;
  title: string;
  description: string;
  image: string | null;
  tags: {
    color: any;
    name: TagType;
  }[];
  footer: { start: string; end: string | null };
  flags: { name: FlagType; color: string }[];
  github: string | null;
  website: string | null;
  community: string | null;
}

const useProjects = (): ProjectData[] => {
  return [
    {
      target: "FB",
      description: "Website for the Fluxer bot, Fishing Bucket which is for proxying messages.",
      title: "Fishing Bucket",
      image: "/FishingBucket.png",
      tags: [{ name: TagType.Website }],
      footer: {
        start: "June 12, 2026",
        end: "June 12, 2026",
      },
      flags: [{ name: FlagType.Contribution }],
      github: "https://github.com/HellishBro/FishingBucketWebsite ",
      community: "https://fluxer.gg/jpXCwft",
      website: "https://fishingbucket.org/",
    },
    {
      target: "FF",
      description: "Simple Fluxer bot that has temp channels, reaction roles, autoroles, and more.",
      title: "Functious",
      image: "/Functious.png",
      tags: [{ name: TagType.FluxerBot }, { name: TagType.Website }],
      footer: {
        start: "Feb 23, 2026",
        end: "Present",
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/Fluxer-Functious",
      community: "https://fluxer.gg/YnINU09E",
      website: "https://functious.vercel.app",
    },
    {
      target: "WY",
      description: "An activity based bot that helps improve overall activity for your server.",
      title: "Would You",
      image: "/WouldYou.svg",
      tags: [{ name: TagType.DiscordBot }],
      footer: {
        start: "Aug 22, 2022",
        end: "Present",
      },
      flags: [],
      github: "https://github.com/Would-You-Bot",
      community: "https://wouldyoubot.gg/discord",
      website: "https://wouldyoubot.gg",
    },
    {
      target: "SB",
      description: "Custom support bot with modmail, giveaways, suggestions, and more.",
      title: "Support Bot",
      image: "/Support.png",
      tags: [{ name: TagType.DiscordBot }],
      footer: {
        start: "Sep 30, 2022",
        end: "Present",
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/Support-Bot",
      community: "https://discord.gg/ty6Rsua",
      website: null,
    },
    {
      target: "SC",
      description: "A web application focused on no censorship.",
      title: "Strafe.chat",
      image: "https://strafe.chat/favicon.ico",
      tags: [{ name: TagType.Website }, { name: TagType.Application }],
      footer: {
        start: "Jul 17, 2023",
        end: "Present",
      },
      flags: [{ name: FlagType.Contribution }],
      github: "https://github.com/strafechat",
      community: "https://discord.gg/yC4qw79qRa",
      website: "https://strafe.chat",
    },
    {
      target: "W",
      description: "A personal website which I add quite literally anything about me for others to know.",
      title: "Personal Website",
      image: "/DSG/DSG Forward Smile.png",
      tags: [{ name: TagType.Website }],
      footer: {
        start: "Jul 2, 2023",
        end: "Present",
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/website",
      community: "https://discord.gg/ty6Rsua",
      website: "/",
    },
    {
      target: "TS",
      description: "A little game about completing topics and finding their related cards.",
      title: "Topic Solitaire",
      image: "/topicSolitaire.png",
      tags: [{ name: TagType.Website }],
      footer: {
        start: "Oct 15, 2025",
        end: "Present",
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/topic-solitaire",
      community: "https://discord.gg/ty6Rsua",
      website: "https://topic-solitaire.vercel.app",
    },
    {
      target: "GC",
      description: "A simple website to check how many Discord servers you're in.",
      title: "Guild Count",
      image: "/guildcount.png",
      tags: [{ name: TagType.Website }],
      footer: {
        start: "June 5, 2021",
        end: "Present",
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/website",
      community: "https://discord.gg/ty6Rsua",
      website: "/projects/guildcount",
    },
    {
      target: "MM",
      description: "A terminal and Tkinter based Mod Manager for Cyberpunk 2077.",
      title: "Mod Manager",
      image: null,
      tags: [{ name: TagType.Application }],
      footer: {
        start: "Feb 17, 2025",
        end: "Present",
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/Mod-Manager",
      community: "https://discord.gg/ty6Rsua",
      website: null,
    },
    {
      target: "F",
      description: "Revolt bot that allows for creating giveaways, polls, and reaction roles.",
      title: "Functious",
      image: "/Functious.png",
      tags: [{ name: TagType.RevoltBot }],
      footer: {
        start: "Feb 18, 2023",
        end: "Sep 19, 2023",
      },
      flags: [{ name: FlagType.Discontinued }],
      github: "https://github.com/forgetfulskybro/Revolt-Functious",
      community: null,
      website: null,
    },
    {
      target: "RBL",
      description: "A place where you can find the best Revolt Bots.",
      title: "Revolt Bot List",
      image: "/Revoltbots.png",
      tags: [{ name: TagType.RevoltBot }, { name: TagType.Website }],
      footer: {
        start: "Apr 12, 2023",
        end: "Sep 19, 2023",
      },
      flags: [{ name: FlagType.Contribution }, { name: FlagType.Discontinued }],
      github: "https://github.com/BrydenIsNotSmart/Revolt-Bot-List",
      community: null,
      website: null,
    },
    {
      target: "RM",
      description: "The first Modmail bot that is made in Revolt.",
      title: "Revolt Modmail",
      image: null,
      tags: [{ name: TagType.RevoltBot }],
      footer: {
        start: "Feb 4, 2023",
        end: "Sep 19, 2023",
      },
      flags: [{ name: FlagType.Discontinued }],
      github: "https://github.com/forgetfulskybro/Revolt-Modmail",
      community: null,
      website: null,
    },
    {
      target: "RB",
      description: "A very simple way to bridge your Revolt & Discord servers together.",
      title: "Revolt Bridge",
      image: null,
      tags: [{ name: TagType.RevoltBot }],
      footer: {
        start: "Feb 7, 2023",
        end: "Sep 19, 2023",
      },
      flags: [{ name: FlagType.Discontinued }],
      github: "https://github.com/forgetfulskybro/Revolt-Bridge",
      community: null,
      website: null,
    },
    {
      target: "D",
      description: "A multipurpose bot that was made to keep your members entertained.",
      title: "Durchie",
      image: "/Durchie.png",
      tags: [{ name: TagType.DiscordBot }],
      footer: {
        start: "Jun 1, 2021",
        end: "Jun 9,2022",
      },
      flags: [{ name: FlagType.Contribution }, { name: FlagType.Discontinued }],
      github: null,
      community: "https://discord.gg/utilibots-618115853178634240",
      website: null,
    },
    {
      target: "AYB",
      description: "Involves AYB Music bot and AYB API that the website used.",
      title: "AYB",
      image: "/Ayb.png",
      tags: [{ name: TagType.DiscordBot }, { name: TagType.Website }],
      footer: {
        start: "Dec 10, 2020",
        end: "Unknown",
      },
      flags: [{ name: FlagType.Contribution }, { name: FlagType.Discontinued }],
      github: "https://github.com/AYB-Archive",
      community: null,
      website: null,
    },
    {
      target: "L",
      description: "Website made by SamOphis on GitHub.",
      title: "Luau.gg",
      image: "/Luau.jpg",
      tags: [{ name: TagType.Website }],
      footer: {
        start: "Apr 1, 2022",
        end: "Apr 1, 2022",
      },
      flags: [{ name: FlagType.Contribution }, { name: FlagType.Discontinued }],
      github: "https://github.com/luaugg",
      community: null,
      website: null,
    },
    {
      target: "FGF",
      description: "A multipurpose bot for many server needs.",
      title: "ForGetFul",
      image: "/Forgetful.png",
      tags: [{ name: TagType.DiscordBot }, { name: TagType.Website }],
      footer: {
        start: "Jul 03, 2019",
        end: "Jun 12, 2023",
      },
      flags: [{ name: FlagType.Discontinued }],
      github: null,
      community: "https://discord.gg/ty6Rsua",
      website: null,
    },
  ].map((project) => ({
    ...project,
    tags: project.tags.map((tag) => ({
      name: tag.name,
      color: tagTypeColorMap[tag.name],
    })),
    flags: project.flags.map((flag) => ({
      name: flag.name,
      color: flagTypeColorMap[flag.name],
    })),
  }));
};

export default useProjects;
