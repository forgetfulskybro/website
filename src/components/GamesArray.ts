export interface GameType {
  target: string;
  title: string;
  review?: boolean;
  image: string | null;
  myRating: number | null;
  tags: any[];
  website: string;
  progress: string;
  reviewText?: string;
}

type GameBase = Omit<GameType, "progress" | "reviewText">;

const Games: GameBase[] = [
  {
    target: "hfw",
    title: "Horizon: Forbidden West",
    review: false,
    image: "/hfw.png",
    myRating: null,
    tags: ["Open World", "Singleplayer", "Action"],
    website: "https://www.playstation.com/en-us/games/horizon-forbidden-west/pc/",
  },
  {
    target: "tow2",
    title: "The Outer Worlds 2",
    review: true,
    image: "/tow2.png",
    myRating: 4.5,
    tags: ["RPG", "Action RPG", "Exploration", "Politics"],
    website: "https://outerworlds2.obsidian.net/",
  },
  {
    target: "dltb",
    title: "Dying Light: The Beast",
    review: true,
    image: "/DLTB.png",
    myRating: 8.3,
    tags: ["Open World", "Zombies", "Parkour", "Horror"],
    website: "https://dyinglightgame.com",
  },
  {
    target: "dl1",
    title: "Dying Light",
    review: true,
    image: "/DL1.png",
    myRating: 8,
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
    myRating: 6.5,
    tags: ["Action-Adventure", "First Person", "Puzzle", "Story Rich"],
    website: "https://indianajones.bethesda.net/",
  },
  {
    target: "stalker",
    title: "S.T.A.L.K.E.R. 2",
    image: "/stalker.jpg",
    myRating: 6.6,
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
    myRating: 8.7,
    tags: ["Story Rich", "Open World", "Adventure", "Action"],
    website: "https://www.suckerpunch.com/category/games/ghostoftsushima/",
  },
  {
    target: "cy",
    title: "Cyberpunk 2077",
    review: true,
    image: "/cyberpunk.ico",
    myRating: 9,
    tags: ["Cyberpunk", "Open World", "Sci-fi", "FPS", "RPG"],
    website: "https://www.cyberpunk.net/us/en/",
  },
  {
    target: "m",
    title: "Metro Exodus",
    review: true,
    image: "/metro.png",
    myRating: 9,
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
    myRating: 8.6,
    tags: ["Post-apocalyptic", "Story Rich", "FPS"],
    website: "https://www.metrothegame.com/en-us/",
  },
];

const gameDetails: Record<
  string,
  Pick<GameType, "progress" | "reviewText">
> = {
  hfw: { progress: "Around 23%" },
  tow2: {
    progress: "Around 75%",
    reviewText:
      "Where to start. At first the game seemed a little promising with the opening scene which is the tutorial. The more you play, the more you realize the game is just fetch quest after fetch quest. The cast characters are alright but I feel like there was some inclusivity added just for the sake of it. I did enjoy doing the Arbiter missions or killing the cult members but the other companion missions were a bit bland. The game is pretty much exactly like the first game, but runs a bit worse and has visual artifacts here and there. I can't recommend the game, or even finish it as it just becomes so boring after spending 25-30 hours going back and fourth to different planets.",
  },
  dltb: {
    progress: "Completed",
    reviewText:
      "After playing Dying Light 2 which was okay but I never finished, this was a VERY refreshing installment of the series. Dying Light: The Beast is the second game we needed and I'm glad they listened to their community to bring this exciting experience. The story, the gore, the parkour, the combat, it's all so good and they did a fantastic job. Fully recommend this game to anyone who enjoyed the first game.",
  },
  dl1: {
    progress: "Around 10% (2nd Playthrough)",
    reviewText:
      "Dying Light is an exhilarating zombie survival game with a captivating story that keeps you on the edge of your seat. I’ve replayed it multiple times and am diving back in for the 2025 update, and it’s just as thrilling every time. The heart-pounding narrative combined with the adrenaline rush of bashing zombies makes it a standout. I highly recommend Dying Light to anyone who loves action-packed survival horror.",
  },
  tg: { progress: "Around 15%" },
  di2: { progress: "Around 45%" },
  kcdII: { progress: "Around 15%" },
  hogleg: { progress: "14%" },
  ijatgc: { progress: "Completed" },
  stalker: { progress: "Around 25%" },
  tlou: {
    progress: "Completed",
    reviewText:
      "The Last of Us is a timeless classic that needs no introduction. Its story remains compelling even years after its release, standing out in the zombie genre with its unique twist of fungi-infested humans who are hauntingly alive. Unlike typical zombie narratives, this game delivers a fresh and emotionally charged experience. I choose to focus on the first game, as the sequel feels overly drawn out and muddles the story, particularly with the frustrating inability to confront the second main character for her actions after defeating countless enemies. Despite this, The Last of Us remains a must-play for its unforgettable narrative and distinctive take on the genre.",
  },
  dl2: { progress: "Around 25% (untracked)" },
  got: {
    progress: "Around 78% (untracked)",
    reviewText:
      "Ghost of Tsushima is a rare gem, the kind of game that comes along once in a blue moon. It weaves a captivating, beautifully crafted story that draws you in and doesn’t let go. Beyond its stellar narrative, the game’s art style is breathtaking, with visuals that are nothing short of spectacular. I wholeheartedly recommend Ghost of Tsushima to anyone who loves story-driven games. It’s easily one of my all-time favorites, right alongside my beloved Metro series.",
  },
  cy: {
    progress: "Around 68% (3rd Playthrough)",
    reviewText:
      "A game which had a lot of issues when it first came out, but has since been patched and improved greatly. After completing the all of the endings for the DLC, this game is like a masterpiece. It's a game that has so much replayability with a growing modding community who keeps adding onto it. HIGHLY recommend the game to anyone, not just people who like RPGs.",
  },
  m: {
    progress: "Completed Four Times",
    reviewText:
      "The Metro series is my all-time favorite, and Metro Exodus is no exception. From the moment I played the first game, I fell in love with its haunting art style and gripping, immersive story. The dark, grim narrative delivers a chilling experience that’s perfect for fans of horror games. I highly recommend this game to anyone who enjoys story-driven horror with a richly atmospheric world.",
  },
  mll: {
    progress: "Completed Four Times",
    reviewText:
      "As the second installment of the Metro series, it marks a pivotal point in its gripping narrative. It seamlessly builds on the foundation of the first game, breathing new life into the story while deepening the dark, atmospheric world. The characters you grow to love in this game become even more compelling by the time you reach the final chapter of the trilogy. Highly recommended.",
  },
  m2033: {
    progress: "Completed Four Times",
    reviewText:
      "Metro 2033 sets the stage with an unforgettable introduction. As the first game in the trilogy, it launches Artyom’s journey with a hauntingly beautiful story that lays the foundation for the series’ dark and immersive world. The grim, atmospheric narrative captivates from start to finish, and I’m thrilled it continues through two more incredible games. Highly recommended.",
  },
};

export function recentGames() {
  return allGames().slice(0, 3);
}

export function allGames(): GameType[] {
  return Games.map((game) => ({
    ...game,
    ...gameDetails[game.target],
  }));
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
// }
