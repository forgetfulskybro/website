"use client";
import useSWR from "swr";
import type { Response } from "../app/api/lastfm/LastFMData";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function LastFMSong(): Partial<Response> {
  const { data } = useSWR<Response>("/api/lastfm", fetcher);
  return data ?? {};
}
