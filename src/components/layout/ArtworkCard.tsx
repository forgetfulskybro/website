"use client";
import { useRef } from "react";
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
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        overflow: "hidden",
      }}
    >
      <div
        className={`artworkImages ${isMultiple ? "multiple" : "single"} ${isGrid ? "grid" : ""} ${isTwoImages ? "two" : ""} ${isThreeImages ? "three" : ""}`}
        style={{ position: "relative" }}
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

        {imageCount > 1 && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 8px",
              borderRadius: 8,
              background: "rgba(0, 0, 0, 0.45)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.9)",
              pointerEvents: "none",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" opacity={0.85}>
              <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z" />
            </svg>
            {imageCount}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: "12px 14px 14px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h3
          className="artworkTitle"
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.25,
            color: "rgba(255, 255, 255, 0.95)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {artwork.title}
        </h3>

        {"dateCreated" in artwork && artwork.dateCreated && (
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.55)",
              lineHeight: 1.3,
            }}
          >
            {String(artwork.dateCreated)}
          </p>
        )}

        {"description" in artwork &&
          typeof (artwork as { description?: string }).description === "string" &&
          (artwork as { description?: string }).description && (
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.65)",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {(artwork as { description?: string }).description}
            </p>
          )}
      </div>
    </button>
  );
}