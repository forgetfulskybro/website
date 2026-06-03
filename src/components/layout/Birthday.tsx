"use client";
import React, { useEffect, useRef, useState } from "react";

function isBirthdayToday(): boolean {
  const d = new Date();
  return d.getMonth() === 5 && d.getDate() === 29;
}

function isBirthdayMonthNotDayAfter(): boolean {
  const d = new Date();
  return d.getMonth() === 5 && d.getDate() !== 30;
}

export const Birthday: React.FC = () => {
  const bdayRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

    if (isBirthdayToday() && wrapper && !reduceMotion) {
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

    if (isBirthdayMonthNotDayAfter()) {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isMobile && isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile, isExpanded]);

  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      {isBirthdayMonthNotDayAfter() && (
        <div
          ref={containerRef}
          className={`BirthdayDiv ${isMobile ? "mobile" : ""} ${isMobile && isExpanded ? "expanded" : ""}`}
          onClick={handleClick}
        >
          <div className="birthdayHeader">
            <b className="Blue birthdayTitle">Birthday</b>
            {isMobile && (
              <span className="birthdayExpandIcon">
                {isExpanded ? "▲" : "▼"}
              </span>
            )}
          </div>
          <p className="birthdayCountdown" ref={bdayRef} id="bday">
            {getInitialTime()}
          </p>
        </div>
      )}
    </>
  );
};
