"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { ArtworkData } from "../ArtworkArray";

interface ArtworkCardProps {
  artwork: ArtworkData;
  onClick: (rect: DOMRect) => void;
}

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
      <div className={`artworkImages ${isMultiple ? "multiple" : "single"} ${isGrid ? "grid" : ""} ${isTwoImages ? "two" : ""} ${isThreeImages ? "three" : ""}`}>
        {displayImages.map((img, index) => (
          <div key={index} className="artworkImageContainer">
            <Image
              width={280}
              height={280}
              src={img}
              alt={`${artwork.title} ${index + 1}`}
              draggable={false}
            />
            {isGrid && index === 3 && remainingCount > 0 && (
              <div className="artworkImageOverlay">
                <span className="artworkImageCount">+{remainingCount}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <h3 className="artworkTitle">{artwork.title}</h3>
    </button>
  );
}
