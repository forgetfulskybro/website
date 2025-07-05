"use client";
import { LastFMSong } from "@/hooks/LastFMSong";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { defaultColors, generateColorVariants } from "./Lyrics/theme";
import { formatDuration } from "./Lyrics/utils";
import { DialogHeader } from "./Lyrics/DialogHeader";
import { useTimeTracking } from "./Lyrics/useTimeTracking";
import MusicDrawer from "./Drawers/MusicDrawer";
import { LangSelect } from "./LanguageSelect";

export default function Lyrics({ children }: { children: React.ReactNode }) {
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
  } = LastFMSong();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLyricsClick = () => {
    setDrawerOpen(true);
  };

  const [isMobile, setIsMobile] = useState(false);

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
    const updateThemeColor = () => {
      try {
        const storedTheme = localStorage.getItem("theme");
        const customColor = localStorage.getItem("customColor");

        let baseColor = defaultColors.main;

        if (customColor) {
          baseColor = customColor;
        } else if (storedTheme) {
          const theme = JSON.parse(storedTheme);
          baseColor = theme.primary;
        }

        setThemeColors(generateColorVariants(baseColor));
      } catch (error) {
        console.error("Error updating theme color:", error);
        setThemeColors(defaultColors);
      }
    };

    updateThemeColor();
    const checkInterval = setInterval(updateThemeColor, 7500);

    window.addEventListener("storage", (e) => {
      if (e.key === "theme" || e.key === "customColor") {
        updateThemeColor();
      }
    });

    return () => {
      clearInterval(checkInterval);
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
          boxShadow: `0 8px 32px ${themeColors.dark}40`,
        },
      }}
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={handleClose}
    >
      <DialogHeader
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
      />
      <DialogContent sx={{ backgroundColor: "transparent" }}>
        <DialogContentText
          sx={{
            color: "#fff",
            whiteSpace: "pre-line",
            marginTop: "20px",
            opacity: 0.9,
            lineHeight: 1.6,
            "& strong, & b": {
              color: themeColors.lighter,
              fontWeight: 600,
            },
          }}
        >
          {lyrics ? lyrics : "Lyrics API is down currently."}
        </DialogContentText>
      </DialogContent>
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
        />
      )}
    </>
  );
}
