/* eslint-disable react/no-children-prop */
"use client";
import TransitionEffect from "@/components/TransitionEffect";
import { LangSelect } from "@/components/LanguageSelect";
import { useRouter } from "next/navigation";
import ToolTip from "@/components/ToolTip";
import Translate from "./translation";
import Image from "next/image";
import React, { useEffect } from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  const data = LangSelect();

  useEffect(() => {
    if (Date().includes("Jun 29")) {
      for (let i = 0; i < 130; i++) {
        var randomRotation = Math.floor(Math.random() * 360);
        var randomScale = Math.random() * 1;
        var randomWidth = Math.floor(
          Math.random() *
            Math.max(
              document.documentElement.clientWidth,
              window.innerWidth || -10
            )
        );
        var randomHeight = Math.floor(
          Math.random() *
            Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 500
            )
        );

        var randomAnimationDelay = Math.floor(Math.random() * 13);
        var confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.top = randomHeight + "px";
        confetti.style.right = randomWidth + "px";
        confetti.style.backgroundColor =
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        confetti.style.transform = "scale(" + randomScale + ")";
        confetti.style.transform =
          "skew(15deg) rotate(" + randomRotation + "deg)";
        confetti.style.animationDelay = randomAnimationDelay + "s";
        document.getElementById("confetti-wrapper")!.appendChild(confetti);
      }
    }

    if (Date().includes("Jun") && !Date().includes("Jun 30")) {
      let countDownDate = new Date(
        `Jun 29, ${new Date().getFullYear()} 00:00:00`
      ).getTime();
      let x = setInterval(function () {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let time = `${days.toString().length < 2 ? `0${days}` : days}:${
          hours.toString().length < 2 ? `0${hours}` : hours
        }:${minutes.toString().length < 2 ? `0${minutes}` : minutes}:${
          seconds.toString().length < 2 ? `0${seconds}` : seconds
        }`;
        document.getElementById("bday")!.innerHTML = time;
        if (distance <= 0) {
          clearInterval(x);
          document.getElementById("bday")!.innerHTML = "Today!";
        }
      }, 1000);
    }
  }, []);

  const router = useRouter();
  return (
    <TransitionEffect>
      {Date().includes("Jun") && !Date().includes("Jun 30") && (
        <div className="BirthdayDiv">
          <p style={{ fontSize: "16px" }}>Birthday</p>
          <p style={{ fontSize: "14px" }} id="bday">
            ??:??:??:??
          </p>
        </div>
      )}
      <div className="parent center">
        <div className="card boxes flexGrid" id="confetti-wrapper">
          <div className="sliderSideSecondary">
            <div style={{ cursor: "pointer" }} onClick={() => router.back()}>
              <ToolTip
                content={new Translate().get(data!, "Comps.pageSecondary.back")}
                placement="top"
              >
                <span id="tooltip" className="dot home homeHigh">
                  <Image
                    src="../backward.svg"
                    width={17}
                    height={17}
                    draggable={false}
                    alt="Go back"
                  />
                </span>
              </ToolTip>
            </div>
          </div>
          <div className="description">{children}</div>
        </div>
      </div>
    </TransitionEffect>
  );
}
