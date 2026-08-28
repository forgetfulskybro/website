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

const isVideoUrl = (url: string) =>
  /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) || url.includes("video/");

function formatTime(seconds: number) {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const glassButtonStyle: React.CSSProperties = {
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
};

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isSeekingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const currentSrc = images[currentIndex];
  const isVideo = isVideoUrl(currentSrc);

  useEffect(() => {
    const tick = () => {
      const v = videoRef.current;
      if (v && !isSeekingRef.current) {
        setCurrentTime(v.currentTime);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
  
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    }
  
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying]);

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
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setShowControls(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex, currentSrc]);

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

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) dragRef.current.hasDragged = true;

      const newPos = clamp(posX + deltaX, posY + deltaY, zoom, e.currentTarget.getBoundingClientRect());
      setPos(newPos);
    },
    [isDragging, zoom, clamp]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    if (dragRef.current.hasDragged) e.stopPropagation();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
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

  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = images[currentIndex];
    a.download = title;
    a.click();
  }, [images, currentIndex, title]);

  const handleOpenInBrowser = useCallback(() => {
    window.open(images[currentIndex], "_blank");
  }, [images, currentIndex]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = parseFloat(e.target.value);
    v.volume = val;
    setVolume(val);
    setIsMuted(val === 0);
    v.muted = val === 0;
  }, []);

  const seekTo = useCallback(
    (clientX: number) => {
      const bar = progressRef.current;
      const v = videoRef.current;
      if (!bar || !v || !duration) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const t = ratio * duration;
      v.currentTime = t;
      setCurrentTime(t);
    },
    [duration]
  );
  
  const handleProgressPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      isSeekingRef.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      seekTo(e.clientX);
    },
    [seekTo]
  );
  
  const handleProgressPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isSeekingRef.current) return;
      seekTo(e.clientX);
    },
    [seekTo]
  );
  
  const handleProgressPointerUp = useCallback(() => {
    isSeekingRef.current = false;
  }, []);
  
  const scheduleHideControls = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  }, [isPlaying]);

  const onVideoTimeUpdate = useCallback(() => {
    if (isSeekingRef.current) return;
    const v = videoRef.current;
    if (v) setCurrentTime(v.currentTime);
  }, []);

  const onVideoLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  }, []);

  const onVideoEnded = useCallback(() => {
    setIsPlaying(false);
    setShowControls(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (isVideo) {
        if (e.key === " " || e.key === "k" || e.key === "K") {
          e.preventDefault();
          togglePlay();
          return;
        }
        if (e.key === "m" || e.key === "M") {
          toggleMute();
          return;
        }
        if (e.key === "ArrowLeft") {
          const v = videoRef.current;
          if (v) {
            v.currentTime = Math.max(0, v.currentTime - 5);
            setCurrentTime(v.currentTime);
          }
          return;
        }
        if (e.key === "ArrowRight") {
          const v = videoRef.current;
          if (v) {
            v.currentTime = Math.min(duration, v.currentTime + 5);
            setCurrentTime(v.currentTime);
          }
          return;
        }
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, isVideo, handlePrev, handleNext, onClose, togglePlay, toggleMute, duration]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const showNav = images.length > 1 && (isVideo || zoom === 1);
  
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
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              color: "white",
              zIndex: 10,
              maxWidth: "calc(100% - 140px)",
            }}
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
                style={glassButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
              >
                <Image src="/arrow.svg" alt="Download" width={20} height={20} draggable={false} />
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
                <Image src="/link.svg" alt="Open in Browser" width={20} height={20} draggable={false} />
              </button>
            </ToolTip>

            <ToolTip content="Close" placement="bottom">
              <button
                style={glassButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <Image src="/close.svg" alt="Close" width={20} height={20} draggable={false} />
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
              {isVideo ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                  }}
                  onMouseMove={scheduleHideControls}
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    ref={videoRef}
                    src={currentSrc}
                    style={{
                      maxWidth: "94.5%",
                      maxHeight: "94.5%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    playsInline
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                      scheduleHideControls();
                    }}
                    onLoadedMetadata={onVideoLoadedMetadata}
                    onEnded={onVideoEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {!isPlaying && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.12)",
                        border: "1px solid rgba(255, 255, 255, 0.25)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        color: "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                        zIndex: 5,
                      }}
                      aria-label="Play"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  )}

                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "16px 20px 20px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                      opacity: showControls || !isPlaying ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      pointerEvents: showControls || !isPlaying ? "auto" : "none",
                      zIndex: 6,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      ref={progressRef}
                      style={{
                        height: 6,
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: 3,
                        cursor: "pointer",
                        marginBottom: 12,
                        position: "relative",
                      }}
                      onPointerDown={handleProgressPointerDown}
                      onPointerMove={handleProgressPointerMove}
                      onPointerUp={handleProgressPointerUp}
                      onPointerLeave={handleProgressPointerUp}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                          background: "rgba(255, 255, 255, 0.9)",
                          borderRadius: 3,
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <button
                        style={glassButtonStyle}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.85)",
                          fontVariantNumeric: "tabular-nums",
                          minWidth: 90,
                        }}
                      >
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>

                      <div style={{ flex: 1 }} />

                      <button
                        style={glassButtonStyle}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted || volume === 0 ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        )}
                      </button>

                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: 80,
                          accentColor: "rgba(255,255,255,0.9)",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Image (original behavior) ── */
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
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}