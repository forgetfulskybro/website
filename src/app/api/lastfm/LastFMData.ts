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
  playing: boolean;
  title: string;
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
    const date = song.date?.uts ? Number(song.date?.uts) : undefined;
    let year: number | undefined;

    return {
      title: capitalize(song.name),
      artist: capitalize(song.artist["#text"]),
      year,
      date,
      url: song.url,
      cover:
        song.image.length > 0 &&
        song.image[3]["#text"] !==
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
          ? song.image[3]["#text"]
          : ((
              await getAlbumCover(
                `track: ${capitalize(song.name)} artist: ${
                  song.artist["#text"]
                }`
              )
            ).coverArt.url as string),
      playing: Boolean(song["@attr"]?.nowplaying) ?? !date,
    };
  } catch (error) {
    console.error(error);
    return;
  }
}
