"use client";
import useSWR from "swr";
import type { WakaResponse } from "../app/api/wakatime/wakatimeData";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function WakaTime(): Partial<WakaResponse> {
  const { data } = useSWR<WakaResponse>("/api/wakatime", fetcher);
  return data ?? {};
}
