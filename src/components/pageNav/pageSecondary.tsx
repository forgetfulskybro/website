"use client";
import TransitionEffect from "@/components/TransitionEffect";
import { Birthday } from "../layout/Birthday";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import ToolTip from "@/components/ToolTip";
import Image from "next/image";

export default function Page({ children }: { children: ReactNode }) {
  const { back } = useRouter();

  const navigateBackKb = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      if (e.key === " ") e.preventDefault();
      back();
    }
  };

  return (
    <TransitionEffect>
      <Birthday />
      <div className="parent center">
        <div className="card boxes flexGrid" id="confetti-wrapper">
          <div className="sliderSide">
            <ToolTip content="Go Back" placement="top">
              <button
                type="button"
                className="navIconButton dot home"
                aria-label="Go Back"
                onClick={() => back()}
                onKeyDown={navigateBackKb}
              >
                <Image
                  style={{ marginTop: "6px", marginRight: "1px" }}
                  src="/backward.svg"
                  width={17}
                  height={17}
                  draggable={false}
                  alt=""
                  priority
                />
              </button>
            </ToolTip>
          </div>

          <div className="hiding flexGrid center">
            <div className="description">{children}</div>
            <div
              className="hiding"
              style={{
                position: "fixed",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "var(--z-nav)",
                isolation: "isolate",
              }}
            >
              <div className="mobileSliderSideSecondary">
                <ToolTip content="Go Back" placement="top">
                  <button
                    type="button"
                    className="navIconButton dot home"
                    aria-label="Go Back"
                    onClick={() => back()}
                    onKeyDown={navigateBackKb}
                  >
                    <Image
                      style={{ marginTop: "6px", marginRight: "1px" }}
                      src="/backward.svg"
                      width={17}
                      height={17}
                      draggable={false}
                      alt=""
                      priority
                    />
                  </button>
                </ToolTip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionEffect>
  );
}
