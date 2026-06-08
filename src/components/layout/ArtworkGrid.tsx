"use client";
import React, { useState } from "react";
import { getArtworks, ArtworkData } from "../ArtworkArray";
import ArtworkCard from "./ArtworkCard";
import ImageViewer from "./ImageViewer";

interface ArtworkGridProps {
  data: string;
}

export default function ArtworkGrid({ data }: ArtworkGridProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);

  const handleArtworkClick = (artwork: ArtworkData, rect: DOMRect) => {
    setSelectedArtwork(artwork);
    setCurrentIndex(0);
    setCardRect(rect);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedArtwork(null);
    setCardRect(null);
  };

  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  const artworkList = getArtworks();

  return (
    <>
      <div className="flexGrid">
        {artworkList.sort((a, b) => b.dateCreated.localeCompare(a.dateCreated)).map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={(rect) => handleArtworkClick(artwork, rect)}
          />
        ))}
      </div>
      {selectedArtwork && (
        <ImageViewer
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
          images={selectedArtwork.images}
          currentIndex={currentIndex}
          onNavigate={handleNavigate}
          title={selectedArtwork.title}
          dateCreated={selectedArtwork.dateCreated}
          cardRect={cardRect}
        />
      )}
    </>
  );
}
