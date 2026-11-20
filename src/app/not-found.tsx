"use client";
import { useShootingStars } from "@/components/ShootingStars";
import Page from "@/components/pageNav/pageSecondary";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()} />
      
      <Page>
        <div className="center flexGrid">
          <div className="sizing">
            Uhhh.. think I forgot to add this page as I&apos;m quite <b>ForGetFul</b>{" "}
            <Image
              style={{ marginBottom: -7 }}
              src="/trol.png"
              width={37}
              height={37}
              draggable={false}
              alt="trol"
            />
          </div>
        </div>
      </Page>
    </main>
  );
}
