"use client";
import type { WakaResponse } from "../app/api/wakatime/wakatimeData";
import useSWR from "swr";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function WakaTime(): Partial<WakaResponse> {
  const { data } = useSWR<WakaResponse>("/api/wakatime", fetcher, {
    refreshInterval: 1000000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: true,
    dedupingInterval: 10000,
  });
  return data ?? {};
}
