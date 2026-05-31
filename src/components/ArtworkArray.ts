export interface ArtworkData {
  id: string;
  title: string;
  dateCreated: string;
  images: string[];
  description?: string;
}

export const artworks: ArtworkData[] = [
  {
    id: "artwork-1",
    title: "Kit & Lulu - Gameoverse",
    dateCreated: "05-19-2026",
    images: ["/KitLuLu.jpg"],
  },
  {
    id: "artwork-2",
    title: "Malice - Gameoverse",
    dateCreated: "05-29-2026",
    images: ["/Malice Drawing.jpg"],
  },
  {
    id: "artwork-3",
    title: "Kit LOAF Collection - Gameoverse",
    dateCreated: "05-27-2026",
    images: ["/Kit LOAF.jpg", "/Kit LOAF sketch.jpg"],
  },
  {
    id: "artwork-4",
    title: "Cyn - Murder Drones",
    dateCreated: "05-12-2026",
    images: ["/Cyn Drawing.jpg"],
  },
  {
    id: "artwork-5",
    title: "Miss Information - Gameoverse",
    dateCreated: "05-25-2026",
    images: ["/Miss Information.jpg"],
  },
];

export const getArtworks = (): ArtworkData[] => {
  return artworks;
};
