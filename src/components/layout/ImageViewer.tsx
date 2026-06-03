"use client";
import React, { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ToolTip from "../ToolTip";

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  title: string;
  dateCreated: string;
  cardRect: DOMRect | null;
}

export default function ImageViewer({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  title,
  dateCreated,
  cardRect,
}: ImageViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (!isZoomed) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        setPosition({
          x: (centerX - x) * 0.5,
          y: (centerY - y) * 0.5,
        });
        setZoom(2);
        setIsZoomed(true);
      } else {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        setIsZoomed(false);
      }
    },
    [isZoomed]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, [currentIndex, images.length, onNavigate]);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = images[currentIndex];
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [images, currentIndex, title]);

  const handleOpenInBrowser = useCallback(() => {
    window.open(images[currentIndex], "_blank");
  }, [images, currentIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="artworkViewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              color: "white",
              zIndex: 10,
              maxWidth: "calc(100% - 140px)",
            }}
            className="artworkTitleContainer"
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                margin: "0 0 8px 0",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: 0,
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              Created: {dateCreated}
            </p>
          </div>

          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              display: "flex",
              gap: "12px",
              zIndex: 10,
            }}
          >
            <ToolTip content="Download" placement="bottom">
              <button
                style={{
                  padding: "8px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
              >
                <Image
                  src="/arrow.svg"
                  alt="Download"
                  width={20}
                  height={20}
                  draggable={false}
                />
              </button>
            </ToolTip>
            <ToolTip content="Open in Browser" placement="bottom">
              <button
                style={{
                  padding: "8px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenInBrowser();
                }}
              >
                <Image
                  src="/link.svg"
                  alt="Open in Browser"
                  width={20}
                  height={20}
                  draggable={false}
                />
              </button>
            </ToolTip>
          </div>

          <div className="artworkViewerContent">
            {images.length > 1 && (
              <>
                <button
                  className="artworkNavArrow left"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                >
                  ←
                </button>
                <button
                  className="artworkNavArrow right"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  →
                </button>
              </>
            )}

            <m.div
              style={{ position: "relative", width: "100%", height: "100%" }}
              exit={
                cardRect
                  ? {
                      x: cardRect.left + cardRect.width / 2 - window.innerWidth / 2,
                      y: cardRect.top + cardRect.height / 2 - window.innerHeight / 2,
                      scale: cardRect.width / Math.min(window.innerWidth * 0.9, window.innerHeight * 0.8),
                      opacity: 0,
                    }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={images[currentIndex]}
                alt={title}
                width={0}
                height={0}
                sizes="100vw"
                className={`artworkViewerImage ${isZoomed ? "zoomed" : ""}`}
                style={{
                  transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                  transformOrigin: "center center",
                  width: "100%",
                  height: "auto",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(e);
                }}
              />
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
