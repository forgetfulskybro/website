/* eslint-disable react/no-children-prop */
"use client";
import TransitionEffect from "@/components/TransitionEffect";
import { useRouter } from "next/navigation";
import { UncontrolledTooltip } from "reactstrap";
import Image from "next/image";
import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <TransitionEffect>
      <div className="parent center">
        <div className="card boxes">
          <div
            style={{ height: "48px", marginRight: ".7rem" }}
            className="cardSlider">
            <div style={{ cursor: "pointer" }} onClick={() => router.back()}>
              <UncontrolledTooltip
                style={{
                  border: "1px solid rgba(var(200, 200, 200), 0.15)",
                  transition: "200ms, border 200ms",
                  margin: "5px 5px 5px 5px",
                  backgroundColor: "#060607",
                  padding: 5,
                  borderRadius: 7,
                  fontSize: 13,
                }}
                target="tooltip">
                Go back
              </UncontrolledTooltip>
              <span
                id="tooltip"
                style={{ marginTop: 8 }}
                className="dot home homeHigh">
                <Image
                  style={{ marginTop: 7 }}
                  src="../backward.svg"
                  width={17}
                  height={17}
                  draggable={false}
                  alt="Go back"
                  priority
                />
              </span>
            </div>
          </div>

          <div className="description">{children}</div>
        </div>
      </div>
    </TransitionEffect>
  );
}
