"use client";
import AnimeViewer from "./AnimeViewer";
import { AnimeEntry } from "@/lib/anilist";
import ToolTip from "@/components/ToolTip";
import Image from "next/image";
import React, { useState } from "react";

interface AnimeCardsProps {
  anime: AnimeEntry[];
  variant?: "compact" | "full";
}

const truncate = (text: string, max = 22) =>
  text.length > max ? `${text.slice(0, max)}..` : text;

export const AnimeCards: React.FC<AnimeCardsProps> = ({
  anime,
  variant = "compact",
}) => {
  const [selected, setSelected] = useState<AnimeEntry | null>(null);
  const full = variant === "full";

  const renderRating = (entry: AnimeEntry) =>
    entry.score ? (
      <>
        <Image
          src="/star.svg"
          width={11}
          height={11}
          alt="Rating"
          draggable={false}
        />
        {entry.score}/10
      </>
    ) : (
      <span className="Blue">Not rated</span>
    );

  return (
    <>
      {anime.map((entry) =>
        full ? (
          <button
            type="button"
            key={entry.id}
            className="animeFullCard interactiveCardButton"
            onClick={() => setSelected(entry)}
          >
            <Image
              className="animeFullCover"
              src={entry.coverImage}
              width={210}
              height={315}
              alt={entry.title}
              draggable={false}
            />
            <div className="animeFullInfo">
              <div className="animeFullTitle">{entry.title}</div>
              <div className="animeFullMeta">
                {[entry.format, entry.seasonYear].filter(Boolean).join(" · ")}
              </div>
              <div className="gameRate animeRate">
                {renderRating(entry)}
              </div>
              <div className="animeTags">
                {entry.genres.slice(0, 4).map((genre) => (
                  <span key={genre} className="animeTag">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ) : (
          <button
            type="button"
            key={entry.id}
            className="gameCard animeCard interactiveCardButton"
            onClick={() => setSelected(entry)}
          >
            <Image
              className="animeIcon"
              src={entry.coverImage}
              width={66}
              height={92}
              alt={entry.title}
              draggable={false}
            />
            <div className="animeBody">
              <ToolTip content={entry.title} placement="top">
                <div className="gameTitle animeTitle">
                  {truncate(entry.title)}
                </div>
              </ToolTip>
              <div className="gameRate animeRate">
                {renderRating(entry)}
              </div>
              <div className="animeTags">
                {entry.genres.slice(0, 3).map((genre) => (
                  <span key={genre} className="animeTag">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </button>
        )
      )}

      <AnimeViewer
        entry={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  );
};
