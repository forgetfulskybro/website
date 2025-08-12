import { NextResponse } from "next/server";
import { Client } from "genius-lyrics";

const nullishQueries = ["None", "N/A", "null", "undefined"];
const client = new Client(process.env.GENIUS);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.getAll("query");

  if (
    !query.length ||
    query.length > 2 ||
    query.some((q) => nullishQueries.includes(q))
  ) {
    return NextResponse.json(
      { error: "Invalid or missing query parameters" },
      { status: 400 }
    );
  }

  try {
    const searchQuery = query.map(decodeURIComponent).join(" ");
    const searches = await client.songs.search(searchQuery);

    const song = searches[0];
    if (!song) {
      return NextResponse.json({ error: "No song found" }, { status: 404 });
    }

    const lyrics = await song.lyrics();
    if (!lyrics) return NextResponse.json({ error: "Lyrics not found" }, { status: 404 })
    const trimmedLyrics = lyrics.substring(lyrics.indexOf("["));

    return NextResponse.json(
      {
        lyrics: trimmedLyrics,
        title: song.title,
        artist: song.artist.name,
        album: song.album?.name ?? null,
        albumArt: song.album?.image ?? null,
        releaseDate: song.releasedAt ?? null,
        image: song.image ?? null,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=43200",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching lyrics:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error}\nStatus: ${error.status}`},
      { status: 500 }
    );
  }
}
