"use client";
import useSWR from "swr";
import type { Response } from "../app/api/lastfm/LastFMData";
import React from "react";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function LastFMSong(): Partial<Response> {
  const { data, mutate } = useSWR<Response>("/api/lastfm", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: true,
    dedupingInterval: 10000,
  });

  React.useEffect(() => {
    const checkNewSong = async () => {
      const newData = await mutate();
      if (newData) {
        window.dispatchEvent(new Event("resetTime"));
      }
    };

    window.addEventListener("checkNewSong", checkNewSong);
    return () => {
      window.removeEventListener("checkNewSong", checkNewSong);
    };
  }, [mutate]);

  return data ?? {};
}
