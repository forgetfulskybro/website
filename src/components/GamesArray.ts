export interface GameType {
  target: string;
  title: string;
  image: string | null;
  myRating: number | null;
  progress: string;
  tags: any[];
  website: string;
}

const Games: GameType[] = [
  {
    target: "ijatgc",
    title: "Indiana Jones",
    image: "/ij.png",
    progress: "Around 34%",
    myRating: 7.4, 
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
    image: "/ghost.jpg",
    progress: "Around 47% (untracked)",
    myRating: 8.9,
    tags: ["Story Rich", "Open World", "Adventure", "Action"],
    website: "https://www.suckerpunch.com/category/games/ghostoftsushima/",
  },
  {
    target: "cy",
    title: "Cyberpunk 2077",
    image: "/cyberpunk.ico",
    progress: "Around 36% (2nd Playthrough)",
    myRating: 8.5,
    tags: ["Cyberpunk", "Open World", "Sci-fi", "FPS", "RPG"],
    website: "https://www.cyberpunk.net/us/en/",
  },
  {
    target: "m",
    title: "Metro Exodus",
    image: "/metro.png",
    progress: "Around 50% (2nd Playthrough)",
    myRating: 8.7,
    tags: ["Post-apocalyptic", "Singleplayer", "Open World", "FPS"],
    website: "https://www.metrothegame.com/en-us/",
  },
  {
    target: "mll",
    title: "Metro: Last Light",
    image: "/metroLastLight.png",
    progress: "Around 23% (2nd Playthrough",
    myRating: 8.5,
    tags: ["Post-apocalyptic", "Atmospheric", "Action"],
    website: "https://www.metrothegame.com/en-us/",
  },
  {
    target: "m2033",
    title: "Metro 2033",
    image: "/metro2033.png",
    progress: "Completed Twice",
    myRating: 8,
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
