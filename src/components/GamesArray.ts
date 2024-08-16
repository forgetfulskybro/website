export interface GameType {
  target: string;
  title: string;
  progress: boolean;
  completed: boolean;
  image: string | null;
  myRating: number | null;
  tags: any[];
  website: string;
}

const Games: GameType[] = [
  {
    target: "tlou",
    title: "The Last of Us",
    progress: true,
    completed: false,
    image: "/tlou.png",
    myRating: null,
    tags: ["Post-apocalyptic", "Story Rich", "shooter", "Horror"],
    website: "https://www.playstation.com/en-us/the-last-of-us/",
  },
  {
    target: "dl2",
    title: "Dying Light 2",
    progress: true,
    completed: false,
    image: "/DL2.png",
    myRating: null,
    tags: ["Open World", "Zombies", "Parkour", "Horror"],
    website: "https://dyinglightgame.com",
  },
  {
    target: "got",
    title: "Ghost of Tsushima",
    progress: true,
    completed: false,
    image: "/ghost.jpg",
    myRating: 8.9,
    tags: ["Story Rich", "Open World", "Adventure", "Action"],
    website: "https://www.suckerpunch.com/category/games/ghostoftsushima/",
  },
  {
    target: "cy",
    title: "Cyberpunk 2077",
    progress: false,
    completed: false,
    image: "/cyberpunk.ico",
    myRating: 8.7,
    tags: ["Cyberpunk", "Open World", "Sci-fi", "FPS", "RPG"],
    website: "https://www.cyberpunk.net/us/en/",
  },
  {
    target: "m",
    title: "Metro Exodus",
    progress: false,
    completed: false,
    image: "/metro.png",
    myRating: 7.4,
    tags: ["Post-apocalyptic", "Singleplayer", "Open World", "FPS"],
    website: "https://www.metrothegame.com/en-us/",
  },
];

export function recentGames() {
  let games: typeof Games = [];
  for (let i = 0; i < 3; i++) {
    games.push(Games[i]);
  }

  return games;
}

export function allGames() {
  return Games;
}
