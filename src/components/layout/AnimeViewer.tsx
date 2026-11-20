"use client";
import { AnimeEntry } from "@/lib/anilist";
import { Dialog } from "@mui/material";
import Image from "next/image";
import React from "react";

interface AnimeViewerProps {
  entry: AnimeEntry | null;
  open: boolean;
  onClose: () => void;
}

export default function AnimeViewer({
  entry,
  open,
  onClose,
}: AnimeViewerProps) {
  if (!entry) return null;

  const details = [
    entry.format,
    entry.episodes
      ? `${entry.episodes} episodes`
      : null,
    entry.seasonYear,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "rgba(23, 23, 23, 0.82)",
          backdropFilter: "blur(14px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
          color: "#fff",
          backgroundImage: "none",
        },
      }}
    >
      <div className="animeViewer">
        <div className="animeViewerHeader">
          <h2 className="animeViewerTitle">{entry.title}</h2>
          <div
            className="animeViewerScore"
            title="My Rating"
          >
            {entry.score ? (
              <>
                <Image
                  src="/star.svg"
                  width={13}
                  height={13}
                  alt="Rating"
                  draggable={false}
                />
                <span>{entry.score}/10</span>
              </>
            ) : (
              <span>Not rated</span>
            )}
          </div>
        </div>

        <div className="animeViewerScroll">
          <Image
            className="animeViewerCover"
            src={entry.coverImage}
            width={170}
            height={255}
            alt={entry.title}
            draggable={false}
          />

          {details && <div className="animeViewerMeta">{details}</div>}

          {entry.description && (
            <>
              <div className="animeViewerMetaLabel">
                Synopsis
              </div>
              <p className="animeViewerDesc">{entry.description}</p>
            </>
          )}

          {entry.genres.length > 0 && (
            <div className="animeViewerGenres">
              <span className="animeViewerLabel">
                Genres
              </span>
              {entry.genres.map((genre) => (
                <span key={genre} className="animeTag">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="animeViewerFooter">
          <a
            className="animeViewerButton"
            href={entry.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on AniList
          </a>
          <button
            type="button"
            className="animeViewerButton"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
}
