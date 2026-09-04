"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ToolTip from "../../ToolTip";

import {
  type ImageViewerProps,
  type ViewMode,
  isVideoUrl,
  getGridColumns,
  getCellSize,
  GIF_BASE_MS,
  glassButtonStyle,
} from "./utils";
import { exportGif } from "./exportGif";
import VideoPlayer from "./VideoPlayer";

export type { ImageViewerProps } from "./utils";

export default function ImageViewer({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  title,
  dateCreated,
}: ImageViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(
    images.length > 1 ? "grid" : "single"
  );

  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
    hasDragged: false,
  });

  const stillImages = images.filter((src) => !isVideoUrl(src));
  const showGifTile = images.length > 1 && stillImages.length > 1;
  const [gifIndex, setGifIndex] = useState(() => Math.max(0, stillImages.length - 1));
  const [gifSpeed, setGifSpeed] = useState(1);
  const gifIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [viewportW, setViewportW] = useState(1200);
  const [isDownloadingGif, setIsDownloadingGif] = useState(false);
  const currentSrc = images[currentIndex];
  const isVideo = isVideoUrl(currentSrc);
  const gridItemCount = images.length + (showGifTile ? 1 : 0);
  const isMobile = viewportW < 640;
  const isTablet = viewportW < 900;
  const horizontalPad = isMobile ? 20 : isTablet ? 32 : 40;
  const gridGap = isMobile ? 10 : 16;
  const topPad = isMobile ? 72 : 80;
  const bottomPad = isMobile ? 24 : 40;

  let cols = getGridColumns(gridItemCount);
  if (isMobile) cols = Math.min(cols, gridItemCount <= 1 ? 1 : 2);
  else if (isTablet) cols = Math.min(cols, 3);

  const availableW = Math.max(0, viewportW - horizontalPad * 2);
  const rawCell = Math.floor((availableW - gridGap * (cols - 1)) / cols);
  const maxCell = isMobile ? 170 : isTablet ? 210 : getCellSize(gridItemCount);
  const minCell = isMobile ? 96 : 120;
  const cellSize = Math.max(minCell, Math.min(rawCell, maxCell));
  const gifIntervalMs = Math.round(GIF_BASE_MS / gifSpeed);
  const gifFadeSec = Math.min(0.7, Math.max(0.15, (gifIntervalMs * 0.4) / 1000));

  useEffect(() => {
    const update = () => setViewportW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (viewMode !== "gif" || stillImages.length < 2) {
      if (gifIntervalRef.current) {
        clearInterval(gifIntervalRef.current);
        gifIntervalRef.current = null;
      }
      return;
    }

    gifIntervalRef.current = setInterval(() => {
      setGifIndex((i) => (i - 1 + stillImages.length) % stillImages.length);
    }, gifIntervalMs);

    return () => {
      if (gifIntervalRef.current) {
        clearInterval(gifIntervalRef.current);
        gifIntervalRef.current = null;
      }
    };
  }, [viewMode, stillImages.length, gifIntervalMs]);

  const clamp = useCallback((x: number, y: number, z: number, rect: DOMRect) => {
    const max = ((z - 1) * Math.min(rect.width, rect.height)) / 2;
    return {
      x: Math.max(-max, Math.min(max, x)),
      y: Math.max(-max, Math.min(max, y)),
    };
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setViewMode(images.length > 1 ? "grid" : "single");
      resetView();
      setGifIndex(Math.max(0, stillImages.length - 1));
      setGifSpeed(1);
      setIsDownloadingGif(false);
    }
  }, [isOpen, images.length, resetView, stillImages.length]);

  const handleZoom = useCallback(
    (newZoom: number) => {
      const clamped = Math.max(1, Math.min(5, newZoom));
      if (clamped === zoom) return;
      if (clamped === 1) return resetView();
      setZoom(clamped);
    },
    [zoom, resetView]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (zoom === 1) return;
      e.stopPropagation();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        posX: pos.x,
        posY: pos.y,
        hasDragged: false,
      };
    },
    [zoom, pos]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const { startX, startY, posX, posY } = dragRef.current;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3)
        dragRef.current.hasDragged = true;

      const newPos = clamp(
        posX + deltaX,
        posY + deltaY,
        zoom,
        e.currentTarget.getBoundingClientRect()
      );
      setPos(newPos);
    },
    [isDragging, zoom, clamp]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    if (dragRef.current.hasDragged) e.stopPropagation();
  }, []);

  const handleClick = useCallback(
    (_e: React.MouseEvent) => {
      if (dragRef.current.hasDragged) {
        dragRef.current.hasDragged = false;
        return;
      }
      handleZoom(zoom === 1 ? 2 : 1);
    },
    [zoom, handleZoom]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      handleZoom(zoom + delta);
    },
    [zoom, handleZoom]
  );

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    resetView();
  }, [currentIndex, images.length, onNavigate, resetView]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    resetView();
  }, [currentIndex, images.length, onNavigate, resetView]);

  const openSingle = useCallback(
    (index: number) => {
      onNavigate(index);
      resetView();
      setViewMode("single");
    },
    [onNavigate, resetView]
  );

  const openGif = useCallback(() => {
    setGifIndex(Math.max(0, stillImages.length - 1));
    setViewMode("gif");
  }, [stillImages.length]);

  const backToGrid = useCallback(() => {
    resetView();
    setViewMode("grid");
  }, [resetView]);

  const handleClose = useCallback(() => {
    if ((viewMode === "single" || viewMode === "gif") && images.length > 1) {
      backToGrid();
    } else {
      onClose();
    }
  }, [viewMode, images.length, backToGrid, onClose]);

  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = images[currentIndex];
    a.download = title;
    a.click();
  }, [images, currentIndex, title]);

  const handleOpenInBrowser = useCallback(() => {
    window.open(images[currentIndex], "_blank");
  }, [images, currentIndex]);

  const handleDownloadGif = useCallback(async () => {
    if (stillImages.length < 2 || isDownloadingGif) return;
    setIsDownloadingGif(true);
    try {
      await exportGif({ stillImages, gifSpeed, title });
    } catch (err) {
      console.error("GIF export failed:", err);
      alert(
        `GIF export failed:\n${err instanceof Error ? err.message : String(err)}\n\nImages must allow CORS (crossOrigin).`
      );
    } finally {
      setIsDownloadingGif(false);
    }
  }, [stillImages, gifSpeed, title, isDownloadingGif]);

  // Keyboard: Escape, image prev/next (video keys handled inside VideoPlayer)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (viewMode === "grid" || viewMode === "gif") return;
      if (isVideo) return; // VideoPlayer owns space/k/m/seek

      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, viewMode, isVideo, handlePrev, handleNext, handleClose]);

  useEffect(() => {
    return () => {
      if (gifIntervalRef.current) clearInterval(gifIntervalRef.current);
    };
  }, []);

  const showNav =
    viewMode === "single" && images.length > 1 && (isVideo || zoom === 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="artworkViewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          transition={{ duration: 0.3 }}
        >
          {/* header */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 12 : 20,
              left: isMobile ? 12 : 20,
              color: "white",
              zIndex: 10,
              maxWidth: isMobile ? "calc(100% - 72px)" : "calc(100% - 180px)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? 18 : 24,
                fontWeight: 600,
                margin: 0,
                wordWrap: "break-word",
                overflowWrap: "break-word",
                lineHeight: 1.25,
              }}
            >
              {title}
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "6px 10px",
                fontSize: isMobile ? 12 : 13,
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>Created: {dateCreated}</span>

              {viewMode === "single" && images.length > 1 && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "2px 9px",
                    borderRadius: 999,
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ opacity: 0.7, fontSize: "0.92em" }}>Image</span>
                  {currentIndex + 1}
                  <span style={{ opacity: 0.45 }}>/</span>
                  {images.length}
                </span>
              )}

              {viewMode === "gif" && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "2px 9px",
                    borderRadius: 999,
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    lineHeight: 1.4,
                  }}
                >
                  GIF
                  <span style={{ opacity: 0.45 }}>·</span>
                  {stillImages.length} frames
                  <span style={{ opacity: 0.45 }}>·</span>
                  {gifSpeed.toFixed(1)}×
                </span>
              )}
            </div>
          </div>

          {/* toolbar */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 12 : 20,
              right: isMobile ? 12 : 20,
              display: "flex",
              gap: isMobile ? 8 : 12,
              zIndex: 10,
            }}
          >
            {viewMode === "single" && (
              <>
                <ToolTip content="Download" placement="bottom">
                  <button
                    style={glassButtonStyle}
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
                    style={glassButtonStyle}
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
              </>
            )}

            {viewMode === "gif" && (
              <ToolTip
                content={isDownloadingGif ? "Creating GIF…" : "Download GIF"}
                placement="bottom"
              >
                <button
                  style={{
                    ...glassButtonStyle,
                    opacity: isDownloadingGif ? 0.6 : 1,
                    cursor: isDownloadingGif ? "wait" : "pointer",
                    minWidth: 36,
                  }}
                  disabled={isDownloadingGif}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadGif();
                  }}
                >
                  {isDownloadingGif ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ animation: "spin 0.9s linear infinite" }}
                    >
                      <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                      <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <Image
                      src="/arrow.svg"
                      alt="Download GIF"
                      width={20}
                      height={20}
                      draggable={false}
                    />
                  )}
                </button>
              </ToolTip>
            )}

            <ToolTip
              content={
                (viewMode === "single" || viewMode === "gif") &&
                images.length > 1
                  ? "Back to grid"
                  : "Close"
              }
              placement="bottom"
            >
              <button
                style={glassButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                <Image
                  src="/close.svg"
                  alt="Close"
                  width={20}
                  height={20}
                  draggable={false}
                />
              </button>
            </ToolTip>
          </div>

          {showNav && (
            <>
              <button
                className="artworkNavArrow left"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
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

          <div className="artworkViewerContent">
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <m.div
                  key="grid"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: isMobile ? "flex-start" : "center",
                    justifyContent: "center",
                    padding: `${topPad}px ${horizontalPad}px ${bottomPad}px`,
                    boxSizing: "border-box",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
                      gap: gridGap,
                      justifyContent: "center",
                      width: "100%",
                      maxWidth: cols * cellSize + gridGap * (cols - 1),
                    }}
                  >
                    {images.map((src, index) => {
                      const video = isVideoUrl(src);
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => openSingle(index)}
                          style={{
                            position: "relative",
                            width: cellSize,
                            height: cellSize,
                            borderRadius: 10,
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.06)",
                            cursor: "pointer",
                            padding: 0,
                            transition: "border-color 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.12)";
                          }}
                        >
                          {video ? (
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
                                  background: "rgba(0,0,0,0.3)",
                                  pointerEvents: "none",
                                }}
                              >
                                <div
                                  style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.15)",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    backdropFilter: "blur(8px)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          ) : (
                            <Image
                              src={src}
                              alt={`${title} ${index + 1}`}
                              fill
                              sizes={`${cellSize}px`}
                              style={{ objectFit: "cover" }}
                              draggable={false}
                            />
                          )}
                        </button>
                      );
                    })}

                    {showGifTile && (
                      <button
                        type="button"
                        onClick={openGif}
                        style={{
                          position: "relative",
                          width: cellSize,
                          height: cellSize,
                          borderRadius: 10,
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.12)",
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: isMobile ? 6 : 10,
                          transition: "border-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.12)";
                        }}
                      >
                        {stillImages[stillImages.length - 1] && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              opacity: 0.35,
                            }}
                          >
                            <Image
                              src={stillImages[stillImages.length - 1]}
                              alt=""
                              fill
                              sizes={`${cellSize}px`}
                              style={{ objectFit: "cover" }}
                              draggable={false}
                            />
                          </div>
                        )}
                        <div
                          style={{
                            position: "relative",
                            zIndex: 1,
                            width: isMobile ? 40 : 52,
                            height: isMobile ? 40 : 52,
                            borderRadius: 12,
                            background: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width={isMobile ? 22 : 28}
                            height={isMobile ? 22 : 28}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M3 9h18M3 15h18" />
                            <path d="M8 5v14M16 5v14" />
                          </svg>
                        </div>
                        <span
                          style={{
                            position: "relative",
                            zIndex: 1,
                            fontSize: isMobile ? 11 : 13,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.9)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          GIF
                        </span>
                        <span
                          style={{
                            position: "relative",
                            zIndex: 1,
                            fontSize: isMobile ? 10 : 11,
                            color: "rgba(255,255,255,0.55)",
                          }}
                        >
                          {stillImages.length} frames
                        </span>
                      </button>
                    )}
                  </div>
                </m.div>
              ) : viewMode === "gif" ? (
                <m.div
                  key="gif"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "min(90vw, 90vh)",
                      height: "min(90vw, 90vh)",
                      maxWidth: "100%",
                      maxHeight: isMobile ? "calc(100% - 120px)" : "100%",
                    }}
                  >
                    <AnimatePresence mode="sync">
                      <m.div
                        key={stillImages[gifIndex]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: gifFadeSec, ease: "easeInOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                        }}
                      >
                        <Image
                          src={stillImages[gifIndex]}
                          alt={`${title} GIF frame ${gifIndex + 1}`}
                          fill
                          sizes="90vw"
                          style={{ objectFit: "contain" }}
                          draggable={false}
                          priority
                        />
                      </m.div>
                    </AnimatePresence>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: isMobile ? 16 : 28,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                      padding: isMobile ? "10px 12px" : "12px 16px",
                      borderRadius: 16,
                      background: "rgba(0,0,0,0.4)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      minWidth: isMobile
                        ? "min(260px, calc(100vw - 32px))"
                        : 220,
                      maxWidth: "calc(100vw - 24px)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      {stillImages.map((_, i) => {
                        const progressIndex =
                          (stillImages.length - 1 - gifIndex + stillImages.length) %
                          stillImages.length;
                        const active = i === progressIndex;

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setGifIndex(stillImages.length - 1 - i);
                            }}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                              border: "none",
                              padding: 0,
                              flexShrink: 0,
                              background: active
                                ? "rgba(255,255,255,0.95)"
                                : "rgba(255,255,255,0.35)",
                              cursor: "pointer",
                              transition: "background 0.25s ease",
                            }}
                            aria-label={`Frame ${i + 1}`}
                          />
                        );
                      })}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? 8 : 12,
                        width: "100%",
                        paddingTop: 2,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="rgba(255,255,255,0.5)"
                        style={{ flexShrink: 0 }}
                      >
                        <ellipse cx="12" cy="13" rx="7" ry="5" />
                        <circle cx="17" cy="10" r="2.5" />
                        <path
                          d="M6 15c-1.5 0-2.5 1-2.5 1M9 18l-1 2M15 18l1 2"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>

                      <div
                        style={{
                          position: "relative",
                          flex: 1,
                          height: 20,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: 4,
                            borderRadius: 2,
                            background: "rgba(255,255,255,0.15)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            width: `${((gifSpeed - 0.5) / (3 - 0.5)) * 100}%`,
                            height: 4,
                            borderRadius: 2,
                            background: "rgba(255,255,255,0.85)",
                            pointerEvents: "none",
                          }}
                        />
                        <input
                          type="range"
                          min={0.5}
                          max={3}
                          step={0.1}
                          value={gifSpeed}
                          onChange={(e) =>
                            setGifSpeed(parseFloat(e.target.value))
                          }
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: "relative",
                            width: "100%",
                            margin: 0,
                            height: 20,
                            cursor: "pointer",
                            appearance: "none",
                            WebkitAppearance: "none",
                            background: "transparent",
                            outline: "none",
                          }}
                          aria-label="GIF speed"
                        />
                      </div>

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="rgba(255,255,255,0.45)"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
                      </svg>

                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.9)",
                          fontVariantNumeric: "tabular-nums",
                          minWidth: 36,
                          textAlign: "right",
                          flexShrink: 0,
                        }}
                      >
                        {gifSpeed.toFixed(1)}×
                      </span>
                    </div>
                  </div>
                </m.div>
              ) : (
                <m.div
                  key="single"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: "relative", width: "100%", height: "100%" }}
                >
                  {isVideo ? (
                    <VideoPlayer src={currentSrc} isMobile={isMobile} />
                  ) : (
                    <Image
                      src={currentSrc}
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
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </m.div>
      )}
    </AnimatePresence>
  );
}