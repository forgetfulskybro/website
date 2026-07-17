"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
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
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, posX: 0, posY: 0, hasDragged: false });

  const clamp = useCallback((x: number, y: number, z: number, rect: DOMRect) => {
    const max = (z - 1) * Math.min(rect.width, rect.height) / 2;
    return {
      x: Math.max(-max, Math.min(max, x)),
      y: Math.max(-max, Math.min(max, y)),
    };
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const handleZoom = useCallback((newZoom: number) => {
    const clamped = Math.max(1, Math.min(5, newZoom));
    if (clamped === zoom) return;
    if (clamped === 1) return resetView();
    setZoom(clamped);
  }, [zoom, resetView]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (zoom === 1) return;
    e.stopPropagation();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: pos.x,
      posY: pos.y,
      hasDragged: false,
    };
  }, [zoom, pos]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const { startX, startY, posX, posY } = dragRef.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) dragRef.current.hasDragged = true;

    const newPos = clamp(posX + deltaX, posY + deltaY, zoom, e.currentTarget.getBoundingClientRect());
    setPos(newPos);
  }, [isDragging, zoom, clamp]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    if (dragRef.current.hasDragged) e.stopPropagation();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (dragRef.current.hasDragged) {
      dragRef.current.hasDragged = false;
      return;
    }
    handleZoom(zoom === 1 ? 2 : 1);
  }, [zoom, handleZoom]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    handleZoom(zoom + delta);
  }, [zoom, handleZoom]);

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    resetView();
  }, [currentIndex, images.length, onNavigate, resetView]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    resetView();
  }, [currentIndex, images.length, onNavigate, resetView]);

  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = images[currentIndex];
    a.download = title;
    a.click();
  }, [images, currentIndex, title]);

  const handleOpenInBrowser = useCallback(() => {
    window.open(images[currentIndex], "_blank");
  }, [images, currentIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handlePrev, handleNext, onClose]);

  const showNav = zoom === 1 && images.length > 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="artworkViewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          transition={{ duration: 0.3 }}
        >
          <div style={{ position: "absolute", top: "20px", left: "20px", color: "white", zIndex: 10, maxWidth: "calc(100% - 140px)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 600, margin: "0 0 8px 0", wordWrap: "break-word", overflowWrap: "break-word" }}>
              {title}
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", margin: 0, wordWrap: "break-word", overflowWrap: "break-word" }}>
              Created: {dateCreated}
            </p>
          </div>

          <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", gap: "12px", zIndex: 10 }}>
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
                onClick={(e) => { e.stopPropagation(); handleDownload(); }}
              >
                <Image src="/arrow.svg" alt="Download" width={20} height={20} draggable={false} />
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
                onClick={(e) => { e.stopPropagation(); handleOpenInBrowser(); }}
              >
                <Image src="/link.svg" alt="Open in Browser" width={20} height={20} draggable={false} />
              </button>
            </ToolTip>

            <ToolTip content="Close" placement="bottom">
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
                onClick={(e) => { e.stopPropagation(); onClose(); }}
              >
                <Image src="/close.svg" alt="Close" width={20} height={20} draggable={false} />
              </button>
            </ToolTip>
          </div>

          {showNav && (
            <>
              <button
                className="artworkNavArrow left"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              >
                ←
              </button>
              <button
                className="artworkNavArrow right"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                →
              </button>
            </>
          )}

          <div className="artworkViewerContent">
            <m.div
              style={{ position: "relative", width: "100%", height: "100%" }}
              exit={cardRect ? {
                x: cardRect.left + cardRect.width / 2 - window.innerWidth / 2,
                y: cardRect.top + cardRect.height / 2 - window.innerHeight / 2,
                scale: cardRect.width / Math.min(window.innerWidth * 0.9, window.innerHeight * 0.8),
                opacity: 0,
              } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={images[currentIndex]}
                alt={title}
                width={0}
                height={0}
                sizes="100vw"
                className={`artworkViewerImage ${zoom > 1 ? "zoomed" : ""} ${isDragging ? "dragging" : ""}`}
                style={{
                  transform: `scale(${zoom}) translate(${pos.x}px, ${pos.y}px)`,
                  transformOrigin: "center center",
                  width: "100%",
                  height: "auto",
                }}
                onClick={handleClick}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onWheel={handleWheel}
              />
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}