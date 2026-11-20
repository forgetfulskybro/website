export interface AnimeEntry {
  id: number;
  title: string;
  coverImage: string;
  coverColor: string | null;
  description: string;
  genres: string[];
  episodes: number | null;
  seasonYear: number | null;
  format: string | null;
  averageScore: number | null;
  siteUrl: string;
  score: number | null;
  progress: number;
  updatedAt: number;
}

interface AniListTitle {
  romaji?: string | null;
  english?: string | null;
}

interface AniListMedia {
  id: number;
  title: AniListTitle;
  coverImage: {
    extraLarge?: string | null;
    large?: string | null;
    color?: string | null;
  };
  description?: string | null;
  genres?: string[] | null;
  episodes?: number | null;
  seasonYear?: number | null;
  format?: string | null;
  averageScore?: number | null;
  siteUrl?: string | null;
}

interface AniListListEntry {
  score?: number | null;
  progress?: number | null;
  updatedAt?: number | null;
  media?: AniListMedia | null;
}

interface AniListListGroup {
  isCustomList?: boolean | null;
  entries?: AniListListEntry[] | null;
}

interface AniListResponse {
  data?: {
    MediaListCollection?: {
      lists?: AniListListGroup[] | null;
    } | null;
  };
  errors?: { message?: string }[];
}

const ANILIST_ENDPOINT = "https://graphql.anilist.co";
const REVALIDATE_SECONDS = 60 * 60;

const ANIME_LIST_QUERY = `
  query ($userName: String) {
    MediaListCollection(
      userName: $userName
      type: ANIME
      sort: [UPDATED_TIME_DESC]
    ) {
      lists {
        isCustomList
        entries {
          status
          score(format: POINT_10_DECIMAL)
          progress
          updatedAt
          media {
            id
            title {
              romaji
              english
            }
            coverImage {
              extraLarge
              large
              color
            }
            description(asHtml: false)
            genres
            episodes
            seasonYear
            format
            status
            averageScore
            siteUrl
          }
        }
      }
    }
  }
`;

export function cleanDescription(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toAnimeEntry(entry: AniListListEntry): AnimeEntry | null {
  const media = entry.media;
  const coverImage = media?.coverImage?.extraLarge || media?.coverImage?.large;
  if (!media || !coverImage) return null;

  const score =
    typeof entry.score === "number" && entry.score > 0
      ? Math.round(entry.score * 10) / 10
      : null;

  return {
    id: media.id,
    title: media.title?.english || media.title?.romaji || "Untitled",
    coverImage,
    coverColor: media.coverImage?.color ?? null,
    description: cleanDescription(media.description),
    genres: media.genres ?? [],
    episodes: media.episodes ?? null,
    seasonYear: media.seasonYear ?? null,
    format: media.format ?? null,
    averageScore: media.averageScore ?? null,
    siteUrl: media.siteUrl ?? `https://anilist.co/anime/${media.id}`,
    score,
    progress: entry.progress ?? 0,
    updatedAt: entry.updatedAt ?? 0,
  };
}

export async function getAnimeList(): Promise<AnimeEntry[]> {
  const userName = process.env.ANILIST_USERNAME?.trim();
  if (!userName) return [];

  const token = process.env.ANILIST_TOKEN?.trim();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(ANILIST_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: ANIME_LIST_QUERY,
        variables: { userName },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`AniList request failed with status ${response.status}`);
      return [];
    }

    const json = (await response.json()) as AniListResponse;
    if (json.errors?.length) {
      console.error(
        `AniList returned an error: ${json.errors[0]?.message ?? "unknown error"}`
      );
      return [];
    }

    const lists = json.data?.MediaListCollection?.lists ?? [];
    const entries = lists.flatMap((list) => list?.entries ?? []);
    const seen = new Set<number>();
    const anime: AnimeEntry[] = [];

    for (const entry of entries) {
      const mapped = toAnimeEntry(entry);
      if (!mapped || seen.has(mapped.id)) continue;
      seen.add(mapped.id);
      anime.push(mapped);
    }

    return anime.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error("Failed to load anime from AniList", error);
    return [];
  }
}
