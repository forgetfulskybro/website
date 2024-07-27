const LASTFM_API = "https://ws.audioscrobbler.com/2.0";
const LASTFM_USERNAME = "ForGetFulSkyBro";
const LASTFM_ENDPOINT = `${LASTFM_API}?method=user.getTopAlbums&api_key=${process.env.LASTFM_API_TOKEN}&format=json&user=${LASTFM_USERNAME}&limit=10&page=1&period=1month`;

type Boolean = "0" | "1";

interface Text<T = string> {
  "#text": T;
}

interface MusicBrainzID extends Text {
  name: string;
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
  playcount: string;
}

interface RecentTracks {
  album: RecentTrack[];
}

interface LastFmResponse {
  topalbums: RecentTracks;
}

export interface Track {
  title: string;
  artist: string;
  url: string;
  cover: string;
  playcount: string;
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getTopTracks() {
  try {
    const response: LastFmResponse = await fetch(LASTFM_ENDPOINT).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`There was an error while querying the Last.fm API.`);
        }

        return response.json();
      }
    );

    const tracks: Track[] = [];
    response.topalbums.album.map((t) => {
      tracks.push({
        title: capitalize(t.name),
        artist: capitalize(t.artist.name),
        url: t.url,
        playcount: t.playcount,
        cover:
          t.image.length > 0 &&
          t.image[3]["#text"] !==
            "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
            ? t.image[3]["#text"]
            : "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
      });
    });
    return tracks;
  } catch (error) {
    console.error(error);
    return;
  }
}
