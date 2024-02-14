/* eslint-disable react/no-children-prop */
"use client";
import TransitionEffect from "@/components/TransitionEffect";
import { useRouter } from "next/navigation";
import ToolTip from "@/components/ToolTip";
import Translate from "./translation";
import Image from "next/image";
import React, { SetStateAction } from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    const handleStorageChange = (event: any) => {
      if ((localStorage.getItem("language") as SetStateAction<string>) !== data)
        return setData(
          localStorage.getItem("language") as SetStateAction<string>
        );
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [data]);

  React.useEffect(() => {
    return setData(
      (localStorage.getItem("language") as SetStateAction<string>)
        ? (localStorage.getItem("language") as SetStateAction<string>)
        : "en_EN"
    );
  }, []);

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
              <ToolTip
                content={new Translate().get(data, "Comps.pageSecondary.back")}
                placement="top"
              >
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
              <ToolTip
                content={new Translate().get(data, "Comps.pageSecondary.back")}
                placement="top"
              >
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
