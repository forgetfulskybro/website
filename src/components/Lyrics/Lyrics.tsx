"use client";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { useTimeTracking } from "../Lyrics/useTimeTracking";
import { motion, AnimatePresence } from "framer-motion";
import { updateThemeColor } from "../updateThemeColor";
import { Response } from "@/app/api/lastfm/LastFMData";
import { DialogHeader } from "../Lyrics/DialogHeader";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { formatDuration } from "../Lyrics/utils";
import MusicDrawer from "../Drawers/MusicDrawer";
import { defaultColors } from "../Lyrics/theme";
import { LangSelect } from "../LanguageSelect";

type LyricsLine = { time: number; text: string };

export default function Lyrics({
  children,
  lastFMSongData,
}: {
  children: React.ReactNode;
  lastFMSongData: Response;
}) {
  const data = LangSelect();
  const [open, setOpen] = useState(false);
  const [themeColors, setThemeColors] = useState(defaultColors);
  const {
    artist,
    title,
    url,
    lyrics,
    syncLyrics,
    duration,
    listeners,
    playcount,
    tags,
    started,
    playing,
    date,
    cover,
  } = lastFMSongData;
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLSpanElement>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSynced, setIsSynced] = useState(true);

  const handleLyricsClick = () => {
    setDrawerOpen(true);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 869);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startedString =
    started instanceof Date ? started.toISOString() : started;

  const {
    elapsedTime,
    rawElapsedMs,
    startTimeTracking,
    getProgress,
    animationFrameRef,
    startTimeRef,
    isVisibleRef,
    currentSongRef,
    updateElapsedTime,
  } = useTimeTracking(startedString, duration);

  useEffect(() => {
    if (started && duration) {
      const songId = `${artist}-${title}`;
      if (currentSongRef.current !== songId) {
        currentSongRef.current = songId;
        startTimeRef.current = new Date(started).getTime();
      }
      startTimeTracking();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    started,
    duration,
    startTimeTracking,
    artist,
    title,
    animationFrameRef,
    currentSongRef,
    startTimeRef,
  ]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";
      isVisibleRef.current = isVisible;

      if (isVisible && open && started && duration) {
        animationFrameRef.current = requestAnimationFrame(updateElapsedTime);
      } else if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    open,
    started,
    duration,
    updateElapsedTime,
    animationFrameRef,
    isVisibleRef,
  ]);

  useEffect(() => {
    if (open && started && duration) {
      startTimeTracking();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [open, started, duration, startTimeTracking, animationFrameRef]);

  useEffect(() => {
    updateThemeColor(setThemeColors);
    const checkInterval = setInterval(
      () => updateThemeColor(setThemeColors),
      1500
    );

    const storageHandler = (e: StorageEvent) => {
      if (e.key === "theme" || e.key === "customColor") {
        updateThemeColor(setThemeColors);
      }
    };

    window.addEventListener("storage", storageHandler);

    return () => {
      clearInterval(checkInterval);
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const bothFunctions = () => {
    handleLyricsClick();
    if (!isMobile) {
      handleClickOpen();
    }
  };

  const parseSyncedLyrics = useCallback(
    (syncedLyrics: string): LyricsLine[] => {
      if (!syncedLyrics) return [];
      const lines = syncedLyrics.split("\n");
      const parsed: LyricsLine[] = [];
      for (const line of lines) {
        const match = line.match(/^\[(\d{2}):(\d{2})\.(\d{2})\]\s*(.*)$/);
        if (match) {
          const [, minutes, seconds, centiseconds, text] = match;
          const time =
            parseInt(minutes) * 60 +
            parseInt(seconds) +
            parseInt(centiseconds) / 100;
          if (text.trim()) {
            parsed.push({ time, text: text.trim() });
          }
        }
      }
      return parsed.sort((a, b) => a.time - b.time);
    },
    []
  );

  const parsedSyncLyrics = useMemo(() => {
    if (!syncLyrics) return [];
    if (typeof syncLyrics === "string") {
      return parseSyncedLyrics(syncLyrics);
    }

    if (Array.isArray(syncLyrics)) {
      return syncLyrics
        .filter((l) => typeof l.time === "number" && typeof l.line === "string")
        .map((l) => ({ time: l.time, text: l.line }))
        .sort((a, b) => a.time - b.time);
    }
    return [];
  }, [syncLyrics, parseSyncedLyrics]);

  const currentLineIndex = useMemo(() => {
    if (!parsedSyncLyrics.length) return -1;
    const elapsedSeconds = rawElapsedMs / 1000;
    return parsedSyncLyrics.findIndex(
      (line, idx) =>
        elapsedSeconds >= line.time &&
        (idx === parsedSyncLyrics.length - 1 ||
          elapsedSeconds < parsedSyncLyrics[idx + 1].time)
    );
  }, [parsedSyncLyrics, rawElapsedMs]);

  const songKey = `${artist}-${title}`;
  const syncButton = (
    <div
      style={{
        position: "fixed",
        right: 42,
        transform: "translateY(-50%)",
        zIndex: 2000,
        pointerEvents: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        size="small"
        style={{
          background: themeColors.light,
          color: "#222",
          fontWeight: 600,
          borderRadius: 20,
          boxShadow: "none",
          textTransform: "none",
          minWidth: 64,
        }}
        onClick={() => setIsSynced((prev) => !prev)}
      >
        {isSynced ? "Pause Sync" : "Sync"}
      </Button>
    </div>
  );

  const dialogContent = (
    <Dialog
      sx={{
        maxHeight: "90vh",
        top: 36,
        "& .MuiDialog-paper": {
          backgroundColor: "rgba(23,23,23,0.7)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          boxShadow: "none",
          border: "1px solid rgba(255,255,255,0.1)",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: `${themeColors.dark}20`,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: themeColors.lighter,
            borderRadius: "4px",
            "&:hover": {
              background: `${themeColors.lighter}cc`,
            },
          },
        },
      }}
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={handleClose}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={songKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DialogHeader
            themeColors={themeColors}
            url={url || ""}
            artist={artist || ""}
            title={title || ""}
            tags={tags || []}
            listeners={listeners}
            playcount={playcount}
            FALLBACK_DURATION={190000}
            elapsedTime={elapsedTime}
            duration={duration}
            started={startedString}
            getProgress={getProgress}
            formatDuration={formatDuration}
            cover={cover}
          />
          <DialogContent
            sx={{ backgroundColor: "transparent", padding: "0 24px 24px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={songKey + "-lyrics"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  maxHeight: "40vh",
                  overflowY: "auto",
                  position: "relative",
                }}
                ref={lyricsContainerRef}
              >
                <DialogContentText
                  sx={{
                    color: "#fff",
                    whiteSpace: "pre-line",
                    marginTop: "20px",
                    opacity: 0.9,
                    lineHeight: 1.6,
                    fontSize: "0.9rem",
                    "& strong, & b": {
                      color: themeColors.lighter,
                      fontWeight: 600,
                    },
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: `${themeColors.dark}20`,
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: themeColors.lighter,
                      borderRadius: "4px",
                      "&:hover": {
                        background: `${themeColors.lighter}cc`,
                      },
                    },
                  }}
                >
                  {parsedSyncLyrics.length > 0 ? (
                    <>
                      {syncButton}
                      {parsedSyncLyrics.map((line, idx) => {
                        const isCurrent = idx === currentLineIndex;
                        return (
                          <span
                            key={line.time + line.text}
                            ref={isCurrent ? currentLineRef : null}
                            style={{
                              display: "block",
                              fontWeight: isCurrent ? 600 : 400,
                              color: isCurrent ? "#222" : "#fff",
                              background: isCurrent
                                ? `linear-gradient(90deg, ${themeColors.lighter} 70%, ${themeColors.dark} 100%)`
                                : "none",
                              borderRadius: isCurrent ? "4px" : "0px",
                              boxShadow: isCurrent
                                ? `0 1px 6px 0 ${themeColors.lighter}33`
                                : "none",
                              padding: isCurrent ? "3px 8px" : "1px 0",
                              opacity: isCurrent ? 1 : 0.7,
                              fontSize: isCurrent ? "1rem" : "0.85rem",
                              letterSpacing: isCurrent ? "0.01em" : "normal",
                              transition:
                                "all 0.18s cubic-bezier(.4,2,.3,1), background 0.2s, color 0.2s",
                              margin: "2px 0",
                            }}
                          >
                            {line.text}
                          </span>
                        );
                      })}
                    </>
                  ) : lyrics ? (
                    lyrics
                  ) : (
                    "Can't find lyrics for this song."
                  )}
                </DialogContentText>
              </motion.div>
            </AnimatePresence>
          </DialogContent>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );

  useEffect(() => {
    if (
      isSynced &&
      parsedSyncLyrics.length > 0 &&
      currentLineRef.current &&
      lyricsContainerRef.current
    ) {
      const container = lyricsContainerRef.current;
      const current = currentLineRef.current;

      const scrollTop =
        current.offsetTop +
        current.offsetHeight / 2 -
        container.offsetHeight / 2;

      container.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }, [currentLineIndex, parsedSyncLyrics.length, isSynced]);

  return (
    <>
      <div onClick={bothFunctions}>{children}</div>
      {dialogContent}
      {isMobile && (
        <MusicDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          playing={playing!}
          themeColors={themeColors}
          url={url || ""}
          artist={artist || ""}
          title={title || ""}
          tags={tags || []}
          listeners={listeners}
          playcount={playcount}
          elapsedTime={elapsedTime}
          duration={duration}
          started={startedString}
          FALLBACK_DURATION={190000}
          getProgress={getProgress}
          formatDuration={formatDuration}
          data={data!}
          date={date}
          lyrics={lyrics}
          syncLyrics={syncLyrics}
          cover={cover}
        />
      )}
    </>
  );
}
