export interface GameType {
  target: string;
  title: string;
  review?: boolean;
  image: string | null;
  myRating: number | null;
  progress: string;
  tags: any[];
  website: string;
}

const Games: GameType[] = [
  {
    target: "dl1",
    title: "Dying Light",
    review: true,
    progress: "Around 10% (2nd Playthrough)",
    image: "/DL1.png",
    myRating: 7.7,
    tags: ["Open World", "Zombies", "Parkour", "Horror"],
    website: "https://dyinglightgame.com",
  },
  {
    target: "tg",
    title: "Tainted Grail",
    image: "/tg.png",
    progress: "Around 15%",
    myRating: null,
    tags: ["RPG", "Adventure", "Open-World", "Datk Fantasy"],
    website: "https://www.taintedgrail.com/",
  },
  {
    target: "di2",
    title: "Dead Island 2",
    image: "/di2.png",
    progress: "Around 45%",
    myRating: null,
    tags: ["Zombies", "First Person", "Gore", "Adventure"],
    website: "https://deadisland.com/",
  },
  {
    target: "kcdII",
    title: "KCD II",
    image: "/kcdII.png",
    progress: "Around 15%",
    myRating: null,
    tags: ["RPG", "Medieval", "Open-World", "Singleplayer"],
    website: "https://kingdomcomerpg.com/",
  },
  {
    target: "hogleg",
    title: "Hogwarts Legacy",
    image: "/hogleg.jpg??",
    progress: "14%",
    myRating: null,
    tags: ["Magic", "Open-World", "Fantasy", "Singleplayer"],
    website: "https://www.hogwartslegacy.com/",
  },
  {
    target: "ijatgc",
    title: "Indiana Jones",
    image: "/ij.png",
    progress: "Completed",
    myRating: 7.2,
    tags: ["Action-Adventure", "First Person", "Puzzle", "Story Rich"],
    website: "https://indianajones.bethesda.net/",
  },
  {
    target: "stalker",
    title: "S.T.A.L.K.E.R. 2",
    image: "/stalker.jpg",
    progress: "Around 25%",
    myRating: 7.1,
    tags: ["Open World", "FPS", "Post-apocolyptic", "Survival"],
    website: "https://www.stalker2.com",
  },
  {
    target: "tlou",
    title: "The Last of Us",
    review: true,
    image: "/tlou.png",
    progress: "Completed",
    myRating: 6.8,
    tags: ["Post-apocalyptic", "Story Rich", "Shooter", "Horror"],
    website: "https://www.playstation.com/en-us/the-last-of-us/",
  },
  {
    target: "dl2",
    title: "Dying Light 2",
    progress: "Around 25% (untracked)",
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
    progress: "Around 78% (untracked)",
    myRating: 8.9,
    tags: ["Story Rich", "Open World", "Adventure", "Action"],
    website: "https://www.suckerpunch.com/category/games/ghostoftsushima/",
  },
  {
    target: "cy",
    title: "Cyberpunk 2077",
    review: true,
    image: "/cyberpunk.ico",
    progress: "Around 78% (2nd Playthrough)",
    myRating: 8.5,
    tags: ["Cyberpunk", "Open World", "Sci-fi", "FPS", "RPG"],
    website: "https://www.cyberpunk.net/us/en/",
  },
  {
    target: "m",
    title: "Metro Exodus",
    review: true,
    image: "/metro.png",
    progress: "Completed Twice",
    myRating: 8.7,
    tags: ["Post-apocalyptic", "Singleplayer", "Open World", "FPS"],
    website: "https://www.metrothegame.com/en-us/",
  },
  {
    target: "mll",
    title: "Metro: Last Light",
    review: true,
    image: "/metroLastLight.png",
    progress: "Completed Twice",
    myRating: 8.6,
    tags: ["Post-apocalyptic", "Atmospheric", "Action"],
    website: "https://www.metrothegame.com/en-us/",
  },
  {
    target: "m2033",
    title: "Metro 2033",
    review: true,
    image: "/metro2033.png",
    progress: "Completed Twice",
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
