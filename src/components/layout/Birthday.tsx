"use client";
import React, { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";

function isToday(): boolean {
  const d = new Date();
  return d.getMonth() === 5 && d.getDate() === 29;
}

function isMonth(): boolean {
  const d = new Date();
  return d.getMonth() === 5 && d.getDate() !== 30;
}

export const Birthday: React.FC = () => {
  const bdayRef = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initialTime, setInitialTime] = useState("???:??:??:??");

  const getInitialTime = () => {
    const countDownDate = new Date(
      `Jun 29, ${new Date().getFullYear()} 00:00:00`
    ).getTime();
    const now = Date.now();
    const distance = countDownDate - now;
    if (distance <= 0) return "Today!";
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const pad = (n: number) => (n.toString().length < 2 ? `0${n}` : `${n}`);
    return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const calculateProgress = () => {
    const now = new Date();
    const currentDay = now.getDate();
    const birthdayDay = 29;

    if (currentDay >= birthdayDay) {
      return 100;
    }

    if (currentDay < 1) {
      return 0;
    }

    const totalDays = birthdayDay - 1;
    const elapsedDays = currentDay - 1;
    const progress = (elapsedDays / totalDays) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setInitialTime(getInitialTime());
    setProgress(calculateProgress());
  }, []);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wrapper = document.getElementById("confetti-wrapper");
    let intervalId: number | undefined;

    const cleanupConfetti = () => {
      if (!wrapper) return;
      wrapper.querySelectorAll(".confetti").forEach((el) => el.remove());
    };

    if (isToday() && wrapper && !reduceMotion) {
      const vw = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 500
      );
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 130; i++) {
        const randomRotation = Math.floor(Math.random() * 360);
        const randomScale = Math.random() * 1;
        const randomWidth = Math.floor(Math.random() * vw);
        const randomHeight = Math.floor(Math.random() * vh);
        const randomAnimationDelay = Math.floor(Math.random() * 13);
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.cssText = `top:${randomHeight}px;right:${randomWidth}px;background-color:#${(0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)};transform:skew(15deg) rotate(${randomRotation}deg) scale(${randomScale});animation-delay:${randomAnimationDelay}s`;
        fragment.appendChild(confetti);
      }
      wrapper.appendChild(fragment);
    }

    if (isMonth()) {
      const countDownDate = new Date(
        `Jun 29, ${new Date().getFullYear()} 00:00:00`
      ).getTime();
      const el = bdayRef.current;
      intervalId = window.setInterval(() => {
        const now = Date.now();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const pad = (n: number) => (n.toString().length < 2 ? `0${n}` : `${n}`);
        const time = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        if (el) el.textContent = distance > 0 ? time : "Today!";
        if (distance <= 0 && intervalId !== undefined) {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      }, 1000) as unknown as number;
    }

    return () => {
      if (intervalId !== undefined) clearInterval(intervalId);
      cleanupConfetti();
    };
  }, []);

  return (
    <>
      {isMonth() && (
        <m.div
          className={`BirthdayDiv ${isMobile ? "mobile" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="birthdayCountdownRow">
            <span className="birthdayIconStatic">🎂</span>
            <p className="birthdayCountdown" ref={bdayRef} id="bday">
              {initialTime}
            </p>
          </div>
          <div className="birthdayProgress">
            <m.div
              className="birthdayProgressBar"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </m.div>
      )}
    </>
  );
};
