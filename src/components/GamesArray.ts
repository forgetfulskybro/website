export interface GameType {
  target: string;
  title: string;
  review?: string;
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
    review:
      "Dying Light is an exhilarating zombie survival game with a captivating story that keeps you on the edge of your seat. I’ve replayed it multiple times and am diving back in for the 2025 update, and it’s just as thrilling every time. The heart-pounding narrative combined with the adrenaline rush of bashing zombies makes it a standout. I highly recommend Dying Light to anyone who loves action-packed survival horror.",
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
    review:
      "The Last of Us is a timeless classic that needs no introduction. Its story remains compelling even years after its release, standing out in the zombie genre with its unique twist of fungi-infested humans who are hauntingly alive. Unlike typical zombie narratives, this game delivers a fresh and emotionally charged experience. I choose to focus on the first game, as the sequel feels overly drawn out and muddles the story, particularly with the frustrating inability to confront the second main character for her actions after defeating countless enemies. Despite this, The Last of Us remains a must-play for its unforgettable narrative and distinctive take on the genre.",
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
    review:
      "Ghost of Tsushima is a rare gem, the kind of game that comes along once in a blue moon. It weaves a captivating, beautifully crafted story that draws you in and doesn’t let go. Beyond its stellar narrative, the game’s art style is breathtaking, with visuals that are nothing short of spectacular. I wholeheartedly recommend Ghost of Tsushima to anyone who loves story-driven games. It’s easily one of my all-time favorites, right alongside my beloved Metro series.",
    image: "/ghost.jpg",
    progress: "Around 78% (untracked)",
    myRating: 8.9,
    tags: ["Story Rich", "Open World", "Adventure", "Action"],
    website: "https://www.suckerpunch.com/category/games/ghostoftsushima/",
  },
  {
    target: "cy",
    title: "Cyberpunk 2077",
    review:
      "One of those games that launched with significant shortcomings but has since evolved into an impressive experience through dedicated updates. While it’s disappointing when a game debuts in rough condition, the developers have invested substantial effort to make amends, delivering the rich, immersive experience fans expected back in 2020. Their commitment to refining the game has truly paid off, making it a must-play for fans of open-world RPGs.",
    image: "/cyberpunk.ico",
    progress: "Around 78% (2nd Playthrough)",
    myRating: 8.5,
    tags: ["Cyberpunk", "Open World", "Sci-fi", "FPS", "RPG"],
    website: "https://www.cyberpunk.net/us/en/",
  },
  {
    target: "m",
    title: "Metro Exodus",
    review:
      "The Metro series is my all-time favorite, and Metro Exodus is no exception. From the moment I played the first game, I fell in love with its haunting art style and gripping, immersive story. The dark, grim narrative delivers a chilling experience that’s perfect for fans of horror games. If Metro Exodus is this captivating, I can only imagine how incredible the books must be. I highly recommend this game to anyone who enjoys story-driven horror with a richly atmospheric world.",
    image: "/metro.png",
    progress: "Completed Twice",
    myRating: 8.7,
    tags: ["Post-apocalyptic", "Singleplayer", "Open World", "FPS"],
    website: "https://www.metrothegame.com/en-us/",
  },
  {
    target: "mll",
    title: "Metro: Last Light",
    review:
      "As the second installment of the Metro series, it marks a pivotal point in its gripping narrative. It seamlessly builds on the foundation of the first game, breathing new life into the story while deepening the dark, atmospheric world. The characters you grow to love in this game become even more compelling by the time you reach the final chapter of the trilogy. I wholeheartedly recommend Metro Last Light to anyone who enjoys horror games with a haunting, grim storyline that keeps you invested from start to finish.",
    image: "/metroLastLight.png",
    progress: "Completed Twice",
    myRating: 8.6,
    tags: ["Post-apocalyptic", "Atmospheric", "Action"],
    website: "https://www.metrothegame.com/en-us/",
  },
  {
    target: "m2033",
    title: "Metro 2033",
    review:
      "Metro 2033 sets the stage with an unforgettable introduction. As the first game in the trilogy, it launches Artyom’s journey with a hauntingly beautiful story that lays the foundation for the series’ dark and immersive world. The grim, atmospheric narrative captivates from start to finish, and I’m thrilled it continues through two more incredible games. I highly recommend Metro 2033 to anyone who loves horror games with a deep, dark, and gripping storyline.",
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
