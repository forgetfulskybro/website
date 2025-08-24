"use client";
import { WakaResponse } from "../../app/api/wakatime/wakatimeData";
import Translate from "@/components/translation";
import { WakaTime } from "@/hooks/WakaTime";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface WakaProps {
  data: string;
}

export const Waka: React.FC<WakaProps> = ({ data }) => {
  const { seconds } = WakaTime() as WakaResponse;

  return (
    <Link href={"https://wakatime.com/@ForGetFulSkyBro"} target="_blank">
      <motion.div
        className="gameCard flex boxes"
        style={{
          width: 335,
          height: 98,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        whileHover="hover"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Image
            src="/wakatime.png"
            alt="WakaTime Logo"
            width={40}
            height={40}
          />
          <div
            style={{
              textAlign: "left",
              color: "white",
            }}
          >
            <span
              style={{ fontSize: "18px", fontWeight: "bold", display: "block" }}
            >
              {!isNaN(seconds)
                ? Math.round(seconds / 3600).toLocaleString()
                : "0"}
              + {new Translate().get(data!, "Info.hours")}
            </span>
            <span style={{ fontSize: "14px", opacity: 0.8, display: "block" }}>
              on WakaTime
            </span>
          </div>
        </div>
        <motion.div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            alignItems: "center",
            gap: "4px",
            opacity: 0.8,
          }}
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10V6.41421L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L17.5858 5H14Z"
              fill="currentColor"
            />
            <path
              d="M5 7C4.44772 7 4 7.44772 4 8V19C4 19.5523 4.44772 20 5 20H16C16.5523 20 17 19.5523 17 19V14.4375C17 13.8852 17.4477 13.4375 18 13.4375C18.5523 13.4375 19 13.8852 19 14.4375V19C19 20.6569 17.6569 22 16 22H5C3.34315 22 2 20.6569 2 19V8C2 6.34315 3.34315 5 5 5H9.5625C10.1148 5 10.5625 5.44772 10.5625 6C10.5625 6.55228 10.1148 7 9.5625 7H5Z"
              fill="currentColor"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </Link>
  );
};
