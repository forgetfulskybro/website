"use client";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { useTimeTracking } from "../Lyrics/useTimeTracking";
import { motion, AnimatePresence } from "framer-motion";
import { updateThemeColor } from "../updateThemeColor";
import { Response } from "@/app/api/lastfm/LastFMData";
import { DialogHeader } from "../Lyrics/DialogHeader";
import React, { useState, useEffect } from "react";
import { formatDuration } from "../Lyrics/utils";
import MusicDrawer from "../Drawers/MusicDrawer";
import { defaultColors } from "../Lyrics/theme";
import { LangSelect } from "../LanguageSelect";

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
    duration,
    listeners,
    playcount,
    tags,
    started,
    playing,
    date,
    cover,
  } = lastFMSongData;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const songKey = `${artist}-${title}`;
  const dialogContent = (
    <Dialog
      sx={{
        maxHeight: "90vh",
        top: 36,
        "& .MuiDialog-paper": {
          backgroundColor: "rgba(23,23,23,0.7)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
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
                }}
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
                  {lyrics ? lyrics : "Can't find lyrics for this song."}
                </DialogContentText>
              </motion.div>
            </AnimatePresence>
          </DialogContent>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );

  return (
    <>
      <div onClick={bothFunctions}>{children}</div>
      {dialogContent}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

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
          getProgress={getProgress}
          formatDuration={formatDuration}
          data={data!}
          date={date}
          lyrics={lyrics}
          cover={cover}
        />
      )}
    </>
  );
}
