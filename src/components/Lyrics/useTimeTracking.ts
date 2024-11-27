import { useCallback, useRef, useState } from "react";
import { formatDuration } from "./utils";

export const useTimeTracking = (started: string | undefined, duration: number | undefined) => {
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const currentSongRef = useRef<string>("");

  const updateElapsedTime = useCallback(() => {
    if (!started || !duration) return;
    
    const currentTime = Date.now();
    const elapsed = currentTime - startTimeRef.current;
    
    if (elapsed >= duration) {
      setElapsedTime(formatDuration(duration));
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('checkNewSong'));
        }
      }, 1000);
      return;
    }
    
    setElapsedTime(formatDuration(elapsed));
    
    if (isVisibleRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateElapsedTime);
    }
  }, [started, duration]);

  const startTimeTracking = useCallback(() => {
    if (started && duration) {
      if (startTimeRef.current === 0) {
        startTimeRef.current = new Date(started).getTime();
      }
      
      if (isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateElapsedTime);
      }
    }
  }, [started, duration, updateElapsedTime]);

  const getProgress = useCallback(() => {
    if (!started || !duration) return 0;
    
    const currentTime = Date.now();
    if (startTimeRef.current === 0) {
      startTimeRef.current = new Date(started).getTime();
      lastUpdateRef.current = currentTime;
    }
    
    const elapsed = currentTime - startTimeRef.current;
    return Math.min(elapsed / duration, 1);
  }, [started, duration]);

  return {
    elapsedTime,
    startTimeTracking,
    getProgress,
    animationFrameRef,
    startTimeRef,
    lastUpdateRef,
    isVisibleRef,
    currentSongRef,
    updateElapsedTime
  };
};
