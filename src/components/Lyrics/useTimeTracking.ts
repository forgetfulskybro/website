import { useCallback, useRef, useState } from "react";
import { formatDuration } from "./utils";

export const useTimeTracking = (
  started: string | undefined,
  duration: number | undefined
) => {
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const currentSongRef = useRef<string>("");
  const FALLBACK_DURATION = 190000; 

  const updateElapsedTime = useCallback(() => {
    if (!started) return;

    const effectiveDuration =
      duration && duration > 0 ? duration : FALLBACK_DURATION;
    const currentTime = Date.now();
    const elapsed = currentTime - startTimeRef.current;

    if (elapsed >= effectiveDuration) {
      setElapsedTime(formatDuration(effectiveDuration));
      if (currentTime - lastUpdateRef.current >= 1000) {
        lastUpdateRef.current = currentTime;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("checkNewSong"));
        }
      }
      return;
    }

    setElapsedTime(formatDuration(elapsed));

    if (isVisibleRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateElapsedTime);
    }
  }, [started, duration]);

  const startTimeTracking = useCallback(() => {
    if (started) {
      if (startTimeRef.current === 0) {
        startTimeRef.current = new Date(started).getTime();
      }

      if (isVisibleRef.current) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(updateElapsedTime);
      }
    }
  }, [started, updateElapsedTime]);

  const getProgress = useCallback(() => {
    if (!started) return 0;

    const effectiveDuration =
      duration && duration > 0 ? duration : FALLBACK_DURATION;
    const currentTime = Date.now();
    if (startTimeRef.current === 0) {
      startTimeRef.current = new Date(started).getTime();
      lastUpdateRef.current = currentTime;
    }

    const elapsed = currentTime - startTimeRef.current;
    return Math.min(elapsed / effectiveDuration, 1);
  }, [started, duration]);

  const setVisibility = useCallback(
    (isVisible: boolean) => {
      isVisibleRef.current = isVisible;
      if (isVisible) {
        startTimeTracking();
      } else if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [startTimeTracking]
  );

  return {
    elapsedTime,
    startTimeTracking,
    getProgress,
    setVisibility,
    animationFrameRef,
    startTimeRef,
    lastUpdateRef,
    FALLBACK_DURATION,
    isVisibleRef,
    currentSongRef,
    updateElapsedTime,
  };
};
