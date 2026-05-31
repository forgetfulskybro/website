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
  const isMultiple = artwork.images.length > 1;

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
      <div className={`artworkImages ${isMultiple ? "multiple" : "single"}`}>
        {artwork.images.map((img, index) => (
          <Image
            width={280}
            height={280}
            key={index}
            src={img}
            alt={`${artwork.title} ${index + 1}`}
            draggable={false}
          />
        ))}
      </div>
      <h3 className="artworkTitle">{artwork.title}</h3>
    </button>
  );
}
