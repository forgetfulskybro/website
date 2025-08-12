/*
  Credit: https://github.com/vimfn/www
*/

import { getAlbumCover } from "./SpotifyAlbum";
const LASTFM_API = "https://ws.audioscrobbler.com/2.0";
const LASTFM_USERNAME = "ForGetFulSkyBro";
const LASTFM_ENDPOINT = `${LASTFM_API}?method=user.getRecentTracks&api_key=${process.env.LASTFM_API_TOKEN}&format=json&user=${LASTFM_USERNAME}&limit=1`;

type Boolean = "0" | "1";

interface Text<T = string> {
  "#text": T;
}

interface MusicBrainzID extends Text {
  mbid: string;
}

interface Image extends Text {
  size: "extralarge" | "large" | "medium" | "small";
}

interface TrackDate extends Text {
  uts: string;
}

interface RecentTrackAttributes {
  nowplaying: string;
}

interface RecentTrack {
  "@attr"?: RecentTrackAttributes;
  album: MusicBrainzID;
  artist: MusicBrainzID;
  date?: TrackDate;
  image: Image[];
  mbid: string;
  name: string;
  streamable: Boolean;
  url: string;
}

interface RecentTracksAttributes {
  page: string;
  perPage: string;
  total: string;
  totalPages: string;
}

interface RecentTracks {
  "@attr": RecentTracksAttributes;

  track: RecentTrack[];
}

interface LastFmResponse {
  recenttracks: RecentTracks;
}

export interface Response {
  artist: string;
  cover?: string;
  date?: number;
  duration: number;
  listeners: number;
  playcount: number;
  started: Date | undefined;
  tags?: {
    name: string;
    url: string;
  }[];
  playing: boolean;
  title: string;
  lyrics: string | null;
  url: string;
  year?: number;
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getLatestSong(): Promise<Response | undefined> {
  try {
    const response: LastFmResponse = await fetch(LASTFM_ENDPOINT).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`There was an error while querying the Last.fm API.`);
        }

        return response.json();
      }
    );

    const song = response.recenttracks?.track?.[0];

    const LASTFM_TRACK = `${LASTFM_API}?method=track.getInfo&api_key=${
      process.env.LASTFM_API_TOKEN
    }&format=json&artist=${song.artist["#text"].replaceAll(
      " ",
      "%20"
    )}&track=${song.name.replaceAll(" ", "%20")}`;

    const trackResponse = await fetch(LASTFM_TRACK).then((response) => {
      if (!response.ok) {
        throw new Error(`There was an error while querying the Last.fm API.`);
      }
      return response.json();
    });

    const track = trackResponse.track;
    let lyrics;

    try {
      lyrics = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/lyrics?query=${encodeURIComponent(
          song.name
        )}&query=${encodeURIComponent(song.artist["#text"])}`
      ).then((response) => {
        return response.json();
      });
    } catch (e: any) {
      console.error("Lyrics API Error:", e.message);
      lyrics = null;
    }

    const date = song.date?.uts ? Number(song.date?.uts) : undefined;
    let year: number | undefined;

    return {
      title: capitalize(song.name),
      artist: capitalize(song.artist["#text"]),
      lyrics: lyrics?.lyrics || null,
      duration: track?.duration || 0,
      listeners: track?.listeners || 0,
      playcount: track?.playcount || 0,
      tags: track?.toptags.tag || [],
      started: new Date(new Date().getTime()),
      year,
      date,
      url: song.url,
      cover:
        song.image.length > 0 &&
        song.image[3]["#text"] !==
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
          ? song.image[3]["#text"]
          : (
              await getAlbumCover(
                `track: ${capitalize(song.name)} artist: ${
                  song.artist["#text"]
                }`
              )
            ).coverArt.url,
      playing: Boolean(song["@attr"]?.nowplaying) ?? !date,
    };
  } catch (error) {
    console.error(error);
    return;
  }
}
