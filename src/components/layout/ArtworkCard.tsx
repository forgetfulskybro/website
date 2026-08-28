"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { ArtworkData } from "../ArtworkArray";

interface ArtworkCardProps {
  artwork: ArtworkData;
  onClick: (rect: DOMRect) => void;
}

const isVideoUrl = (url: string) =>
  /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) || url.includes("video/");

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const imageCount = artwork.images.length;
  const isMultiple = imageCount > 1;
  const isGrid = imageCount >= 4;
  const isTwoImages = imageCount === 2;
  const isThreeImages = imageCount === 3;
  const displayImages = isGrid ? artwork.images.slice(0, 4) : artwork.images;
  const remainingCount = imageCount > 4 ? imageCount - 4 : 0;

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onClick(rect);
    }
  };

  return (
    <button
      ref={cardRef}
      type="button"
      className="artworkCard interactiveCardButton"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        className={`artworkImages ${isMultiple ? "multiple" : "single"} ${isGrid ? "grid" : ""} ${isTwoImages ? "two" : ""} ${isThreeImages ? "three" : ""}`}
      >
        {displayImages.map((src, index) => {
          const isVideo = isVideoUrl(src);

          return (
            <div key={index} className="artworkImageContainer">
              {isVideo ? (
                <>
                  <video
                    src={src}
                    muted
                    playsInline
                    preload="metadata"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.25)",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.15)",
                        border: "1px solid rgba(255, 255, 255, 0.35)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  width={280}
                  height={280}
                  src={src}
                  alt={`${artwork.title} ${index + 1}`}
                  draggable={false}
                />
              )}

              {isGrid && index === 3 && remainingCount > 0 && (
                <div className="artworkImageOverlay">
                  <span className="artworkImageCount">+{remainingCount}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <h3 className="artworkTitle">{artwork.title}</h3>
    </button>
  );
}