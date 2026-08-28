export interface ArtworkData {
  id: string;
  title: string;
  dateCreated: string;
  images: string[];
  description?: string;
}

export const artworks: ArtworkData[] = [
  {
    id: "artwork-TLC",
    title: "Talia Yang Crying",
    dateCreated: "08-28-2026",
    images: ["/Talia Crying.mp4", "/Talia Crying.png", "/Talia Crying Sketch.png", "/Talia Crying Sketch 2.png", "/Talia Crying Sketch 3.png", "/Talia Crying Sketch 4.png", "/Talia Crying Sketch 5.png"],
  },
  {
    id: "artwork-MKMS",
    title: "Chiharu Kujo - Milky Subway",
    dateCreated: "08-24-2026",
    images: ["/Chiharu Kujo.png", "/Chiharu Kujo Sketch.png", "/Chiharu Kujo Sketch 1.png", "/Chiharu Kujo Sketch 2.png", "/Chiharu Kujo Sketch 3.jpg"],
  },
  {
    id: "artwork-DSGR",
    title: "Serial Designation R - Original Creation",
    dateCreated: "08-04-2026",
    images: ["/Serial Designation R.png", "/Serial Designation R Sketch.png"],
  },
  {
    id: "artwork-SDGR",
    title: "Serial Designation G Remake - Original Creation",
    dateCreated: "08-11-2026",
    images: ["/DSG Forward Smile.png", "/DSG Forward Smirk.png", "/DSG Forward Sketch 4.png", "/DSG Forward Sketch 3.png", "/DSG Forward Sketch 2.png", "/DSG Forward Sketch.png"],
  },
  {
    id: "artwork-UHN",
    title: "Uzi holding Nog  - Murder Drones",
    dateCreated: "08-14-2026",
    images: ["/Uzi holding Nog.png", "/Uzi holding Nog Sketch 3.png", "/Uzi holding Nog Sketch 2.png", "/Uzi holding Nog Sketch.png"],
  },
  {
    id: "artwork-SGV",
    title: "Serial Designation V - Murder Drones",
    dateCreated: "08-05-2026",
    images: ["/Serial Designation V.png", "/Serial Designation V Sketch.png"],
  },
  {
    id: "artwork-MDJA",
    title: "Serial Designation J - Murder Drones",
    dateCreated: "07-16-2026",
    images: ["/J Angry.png", "/J Angry Sketch 1.png", "/J Angry Sketch.jpg"],
  },
  {
    id: "artwork-TYCPE",
    title: "Talia Yang - Cyberpunk Edgerunners II",
    dateCreated: "07-10-2026",
    images: ["/Talia Yang - Alternate.png", "/Talia Yang Mouth Opened.png", "/Talia Yang Mask Sketch 1.png", "/Talia Yang Mask Sketch.jpg", "/Talia Yang - Cyberpunk Edgerunners.png", "/Talia Yang Sketch 1.png", "/Talia Yang Sketch.jpg"],
  },
  {
    id: "artwork-DSG",
    title: "Serial Designation G - Original Creation",
    dateCreated: "06-24-2026",
    images: ["/DSG Head Redesign.png", "/DSG Head Redesign Sketch.png", "/DSG Final.png", "/DSG Sketch Final.png", "/DSG Sketch 1.jpg", "/DSG Sketch 0.jpg", "/DSG Sketch.jpg"],
  },
  {
    id: "artwork-USLAFS",
    title: "Usui Sachi - Love at First Sight",
    dateCreated: "06-10-2026",
    images: ["/Usui Sachi.jpg", "/Usui Sachi Sketch.jpg"],
  },
  {
    id: "artwork-ESB",
    title: "Evie - Stellar Blade: BLOOD RAIN",
    dateCreated: "06-10-2026",
    images: ["/Evie Drawing.png", "/Evie Drawing.jpg", "/Evie Drawing Sketch.jpg"],
  },
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
