export interface ArtworkData {
  id: string;
  title: string;
  dateCreated: string;
  images: string[];
  description?: string;
}

export const artworks: ArtworkData[] = [
  {
    id: "artwork-KLG",
    title: "Kit & Lulu - Gameoverse",
    dateCreated: "05-19-2026",
    images: ["/KitLuLu.jpg"],
  },
  {
    id: "artwork-CMD2",
    title: "Cyn Sketch - Murder Drones",
    dateCreated: "06-07-2026",
    images: ["/Cyn Drawing 2.jpg", "/Cyn Drawing 2 sketch 1.jpg", "/Cyn Drawing 2 sketch.jpg"],
  },
  {
    id: "artwork-MG",
    title: "Malice - Gameoverse",
    dateCreated: "05-29-2026",
    images: ["/Malice Drawing.jpg"],
  },
  {
    id: "artwork-LKCE",
    title: "Lucyna Kushinada - Cyberpunk Edgerunners",
    dateCreated: "06-03-2026",
    images: ["/Lucy Drawing.png", "/Lucy Drawing Sketch.jpg"],
  },
  {
    id: "artwork-KLCG",
    title: "Kit LOAF Collection - Gameoverse",
    dateCreated: "05-27-2026",
    images: ["/Kit LOAF.jpg", "/Kit LOAF sketch.jpg"],
  },
  {
    id: "artwork-CMD",
    title: "Cyn - Murder Drones",
    dateCreated: "05-12-2026",
    images: ["/Cyn Drawing.jpg"],
  },
  {
    id: "artwork-MIG",
    title: "Miss Information - Gameoverse",
    dateCreated: "05-25-2026",
    images: ["/Miss Information.jpg"],
  },
];

export const getArtworks = (): ArtworkData[] => {
  return artworks;
};
