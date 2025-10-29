export interface GameType {
  target: string;
  title: string;
  review?: boolean;
  image: string | null;
  myRating: number | null;
  tags: any[];
  website: string;
}

const Games: GameType[] = [
  {
    target: "tow2",
    title: "The Outer Worlds 2",
    review: false,
    image: "/tow2.png?",
    myRating: null,
    tags: ["RPG", "Action RPG", "Exploration", "Politics"],
    website: "https://outerworlds2.obsidian.net/",
  },
  {
    target: "dltb",
    title: "Dying Light: The Beast",
    review: true,
    image: "/DLTB.png",
    myRating: 8,
    tags: ["Open World", "Zombies", "Parkour", "Horror"],
    website: "https://dyinglightgame.com",
  },
  {
    target: "dl1",
    title: "Dying Light",
    review: true,
    image: "/DL1.png",
    myRating: 7.7,
    tags: ["Open World", "Zombies", "Parkour", "Horror"],
    website: "https://dyinglightgame.com",
  },
  {
    target: "tg",
    title: "Tainted Grail",
    image: "/tg.png",
    myRating: null,
    tags: ["RPG", "Adventure", "Open-World", "Datk Fantasy"],
    website: "https://www.taintedgrail.com/",
  },
  {
    target: "di2",
    title: "Dead Island 2",
    image: "/di2.png",
    myRating: null,
    tags: ["Zombies", "First Person", "Gore", "Adventure"],
    website: "https://deadisland.com/",
  },
  {
    target: "kcdII",
    title: "Kingdom Come: Deliverance II",
    image: "/kcdII.png",
    myRating: null,
    tags: ["RPG", "Medieval", "Open-World", "Singleplayer"],
    website: "https://kingdomcomerpg.com/",
  },
  {
    target: "hogleg",
    title: "Hogwarts Legacy",
    image: "/hoglg.jpg",
    myRating: null,
    tags: ["Magic", "Open-World", "Fantasy", "Singleplayer"],
    website: "https://www.hogwartslegacy.com/",
  },
  {
    target: "ijatgc",
    title: "Indiana Jones",
    image: "/ij.png",
    myRating: 7,
    tags: ["Action-Adventure", "First Person", "Puzzle", "Story Rich"],
    website: "https://indianajones.bethesda.net/",
  },
  {
    target: "stalker",
    title: "S.T.A.L.K.E.R. 2",
    image: "/stalker.jpg",
    myRating: 7.1,
    tags: ["Open World", "FPS", "Post-apocolyptic", "Survival"],
    website: "https://www.stalker2.com",
  },
  {
    target: "tlou",
    title: "The Last of Us",
    review: true,
    image: "/tlou.png",
    myRating: 6,
    tags: ["Post-apocalyptic", "Story Rich", "Shooter", "Horror"],
    website: "https://www.playstation.com/en-us/the-last-of-us/",
  },
  {
    target: "dl2",
    title: "Dying Light 2",
    image: "/DL2.png",
    myRating: null,
    tags: ["Open World", "Zombies", "Parkour", "Horror"],
    website: "https://dyinglightgame.com",
  },
  {
    target: "got",
    title: "Ghost of Tsushima",
    review: true,
    image: "/ghost.jpg",
    myRating: 8.9,
    tags: ["Story Rich", "Open World", "Adventure", "Action"],
    website: "https://www.suckerpunch.com/category/games/ghostoftsushima/",
  },
  {
    target: "cy",
    title: "Cyberpunk 2077",
    review: true,
    image: "/cyberpunk.ico",
    myRating: 8.5,
    tags: ["Cyberpunk", "Open World", "Sci-fi", "FPS", "RPG"],
    website: "https://www.cyberpunk.net/us/en/",
  },
  {
    target: "m",
    title: "Metro Exodus",
    review: true,
    image: "/metro.png",
    myRating: 8.7,
    tags: ["Post-apocalyptic", "Singleplayer", "Open World", "FPS"],
    website: "https://www.metrothegame.com/en-us/",
  },
  {
    target: "mll",
    title: "Metro: Last Light",
    review: true,
    image: "/metroLastLight.png",
    myRating: 8.6,
    tags: ["Post-apocalyptic", "Atmospheric", "Action"],
    website: "https://www.metrothegame.com/en-us/",
  },
  {
    target: "m2033",
    title: "Metro 2033",
    review: true,
    image: "/metro2033.png",
    myRating: 8.5,
    tags: ["Post-apocalyptic", "Story Rich", "FPS"],
    website: "https://www.metrothegame.com/en-us/",
  },
];

export function recentGames() {
  return Games.slice(0, 3);
}

export function allGames() {
  return Games;
}

// Example layout
// {
//   target: "",
//   title: "",
//   image: "/",
//   progress: "",
//   myRating: 0,
//   tags: ["", "", "", ""],
//   website: "",
// },
