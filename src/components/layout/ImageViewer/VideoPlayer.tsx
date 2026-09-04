"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { formatTime, glassButtonStyle } from "./utils";

interface VideoPlayerProps {
  src: string;
  isMobile: boolean;
}

export default function VideoPlayer({ src, isMobile }: VideoPlayerProps) {
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

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setShowControls(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [src]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

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

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = videoRef.current;
      if (!v) return;
      const val = parseFloat(e.target.value);
      v.volume = val;
      setVolume(val);
      setIsMuted(val === 0);
      v.muted = val === 0;
    },
    []
  );

  const seekTo = useCallback(
    (clientX: number) => {
      const bar = progressRef.current;
      const v = videoRef.current;
      if (!bar || !v || !duration) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
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

  const onVideoLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  }, []);

  const onVideoEnded = useCallback(() => {
    setIsPlaying(false);
    setShowControls(true);
  }, []);

  // Keyboard: space/k play, m mute, arrows seek
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, toggleMute, duration]);

  return (
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
        src={src}
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
            width: isMobile ? 56 : 72,
            height: isMobile ? 56 : 72,
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
          <svg
            width={isMobile ? 22 : 28}
            height={isMobile ? 22 : 28}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
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
          padding: isMobile ? "12px 14px 16px" : "16px 20px 20px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
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
            gap: isMobile ? 8 : 12,
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
              fontSize: isMobile ? 12 : 13,
              color: "rgba(255,255,255,0.85)",
              fontVariantNumeric: "tabular-nums",
              minWidth: isMobile ? 70 : 90,
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

          {!isMobile && (
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
          )}
        </div>
      </div>
    </div>
  );
}