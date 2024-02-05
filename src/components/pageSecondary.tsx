/* eslint-disable react/no-children-prop */
"use client";
import TransitionEffect from "@/components/TransitionEffect";
import { useRouter } from "next/navigation";
import ToolTip from "@/components/ToolTip";
import Image from "next/image";
import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <TransitionEffect>
      <div className="parent center">
        <div className="card boxes flexGrid">
          <div
            style={{
              height: "48px",
            }}
            className="cardSlider hide"
          >
            <div style={{ cursor: "pointer" }} onClick={() => router.back()}>
              <ToolTip content="Go Back" placement="top">
                <span
                  id="tooltip"
                  style={{ marginTop: 8 }}
                  className="dot home homeHigh"
                >
                  <Image
                    style={{ marginTop: 7 }}
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

          <div
            style={{
              height: "48px",
            }}
            className="sliderSideSecondary hiding"
          >
            <div style={{ cursor: "pointer" }} onClick={() => router.back()}>
              <ToolTip content="Go Back" placement="top">
                <span
                  id="tooltip"
                  style={{ marginTop: 8 }}
                  className="dot home homeHigh"
                >
                  <Image
                    style={{ marginTop: 7 }}
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
        </div>
      </div>
    </TransitionEffect>
  );
}
