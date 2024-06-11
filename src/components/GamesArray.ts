export interface GameType {
  target: string;
  title: string;
  progress: boolean;
  completed: boolean;
  image: string | null;
  myRating: number;
  tags: any[];
  website: string;
}

const Games: GameType[] = [
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
];

export function recentGames() {
  let games: typeof Games = [];
  Games.map((g, i = 0) => {
    i++;
    if (i == 4) return;
    else games.push(g);
  });

  return games;
}

export function allGames() {
  return Games;
}
