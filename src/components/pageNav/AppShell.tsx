"use client";
import TransitionEffect from "@/components/TransitionEffect";
import React, { ReactNode } from "react";
import MobileNavigation from "./MobileNavigation";
import { usePathname } from "next/navigation";
import { Birthday } from "../layout/Birthday";
import { NavItem } from "../types";
import Navigation from "./Navigation";

const navItems: NavItem[] = [
  {
    name: "Home",
    class: "home",
    src: "House",
    path: "/",
  },
  {
    name: "Projects",
    class: "projects",
    src: "Folder",
    path: "/projects",
  },
  {
    name: "Artwork",
    class: "artwork",
    src: "Palette",
    path: "/artwork",
  },
  {
    name: "Games",
    class: "games",
    src: "Gamepad",
    path: "/info/games",
  },
  {
    name: "Anime",
    class: "anime",
    src: "Anime",
    path: "/info/anime",
  },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <TransitionEffect>
      <Birthday />
      <div className="parent center">
        <div className="card boxes" id="confetti-wrapper">
          <div className="sliderSide">
            <Navigation items={navItems} pathname={pathname} />
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
              <div className="mobileSliderSide">
                <MobileNavigation items={navItems} pathname={pathname} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionEffect>
  );
}
