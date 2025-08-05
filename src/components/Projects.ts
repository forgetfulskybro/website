import Translate from "@/components/translation";

enum TagType {
  DiscordBot = "Discord Bot",
  RevoltBot = "Revolt Bot",
  Website = "Website",
  Application = "Application",
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

const useProjects = (data: any): ProjectData[] => {
  const translate = new Translate();

  return [
    {
      target: "WY",
      title: "Would You",
      image: "/WouldYou.svg",
      tags: [{ name: TagType.DiscordBot }],
      footer: {
        start: "Aug 22, 2022",
        end: translate.get(data, "Projects.footer.endPresent"),
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
      tags: [{ name: TagType.DiscordBot }],
      footer: {
        start: "Sep 30, 2022",
        end: translate.get(data, "Projects.footer.endPresent"),
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
      tags: [{ name: TagType.Website }, { name: TagType.Application }],
      footer: {
        start: "Jul 17, 2023",
        end: translate.get(data, "Projects.footer.endPresent"),
      },
      flags: [{ name: FlagType.Contribution }],
      github: "https://github.com/strafechat",
      community: "https://discord.gg/yC4qw79qRa",
      website: "https://strafe.chat",
    },
    {
      target: "W",
      title: "Personal Website",
      image: "/Me.png",
      tags: [{ name: TagType.Website }],
      footer: {
        start: "Jul 2, 2023",
        end: translate.get(data, "Projects.footer.endPresent"),
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/website",
      community: "https://discord.gg/ty6Rsua",
      website: "/",
    },
    {
      target: "GC",
      title: "Guild Count",
      image: "/guildcount.png",
      tags: [{ name: TagType.Website }],
      footer: {
        start: "June 5, 2021",
        end: translate.get(data, "Projects.footer.endPresent"),
      },
      flags: [],
      github: "https://github.com/forgetfulskybro/website",
      community: "https://discord.gg/ty6Rsua",
      website: "/projects/guildcount",
    },
    {
      target: "F",
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
      title: "AYB",
      image: "/Ayb.png",
      tags: [{ name: TagType.DiscordBot }, { name: TagType.Website }],
      footer: {
        start: "Dec 10, 2020",
        end: translate.get(data, "Projects.footer.endUnknown"),
      },
      flags: [{ name: FlagType.Contribution }, { name: FlagType.Discontinued }],
      github: "https://github.com/AYB-Archive",
      community: null,
      website: null,
    },
    {
      target: "L",
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
