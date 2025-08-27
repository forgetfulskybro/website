export function getMetadata(path: string): {
  title: string;
  description: string;
  image?: string;
} {
  const metaMap: Record<
    string,
    { title: string; description: string; image?: string }
  > = {
    "/": {
      title: "Sky // 🗿🐢",
      description: "Home page for my personal website.",
    },
    "/projects": {
      title: "Sky // projects",
      description: "A collection of projects I've worked on over the years.",
    },
    "/projects/guildcount": {
      title: "Guild Count",
      description: "A simple tool to check how many Discord servers you're in.",
      image: "/guildcount.png",
    },
    "/info": {
      title: "Sky // info",
      description:
        "Information about what music I'm listening to, recent games I've played, and WakaTime stats.",
    },
    "/info/games": {
      title: "Sky // info // games",
      description:
        "Showcases all story games I've played in the last few years or so with reviews and ratings.",
    },
  };
  return (
    metaMap[path] || {
      title: "Sky // 404",
      description:
        "I must've forgot to add something here since I'm ForGetFul :trol:",
    }
  );
}
