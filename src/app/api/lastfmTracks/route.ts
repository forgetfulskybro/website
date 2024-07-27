import { NextResponse } from "next/server";
import { getTopTracks } from "./LastFMTracks";

export const runtime = "edge";
/**
 * A Route Handler fetching the latest song I listened to from Last.fm.
 */
export async function GET() {
  const song = await getTopTracks();
  return song
    ? NextResponse.json(song)
    : new Response(undefined, { status: 500 });
}

export const dynamic = "force-dynamic";
