"use client";
import useSWR from "swr";
import type { Track } from "../app/api/lastfmTracks/LastFMTracks";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function LastFMTracks(): Partial<Track> {
  const data = useSWR<Track>("/api/lastfmTracks", fetcher);
  console.log(data);
  return data as any
}
