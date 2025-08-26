"use client";
import TransitionEffect from "@/components/TransitionEffect";
import SettingsComponents, { themes } from "./pageSettings";
import SettingsDrawer from "../Drawers/SettingsDrawer";
import React, { ReactNode, useState } from "react";
import MobileNavigation from "./MobileNavigation";
import { usePathname } from "next/navigation";
import { Birthday } from "../layout/Birthday";
import { Theme, NavItem } from "../types";
import { Popover } from "@mui/material";
import Translate from "../translation";
import Navigation from "./Navigation";
import ToolTip from "../ToolTip";
import Image from "next/image";

export default function Page({ children }: { children: ReactNode }) {
  const translate = new Translate();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const [language, setLanguage] = useState<string | null>(
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "en_EN"
      : ""
  );
  const [customColor, setCustomColor] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("customColor") || "#131314";
    }
    return "#131314";
  });
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const themePreference = localStorage.getItem("themePreference");
      const savedThemeName = localStorage.getItem("themeName");

      if (themePreference === "custom") {
        const savedCustomColor = localStorage.getItem("customColor");
        const savedCustomColorRGB = localStorage.getItem("customColorRGB");
        if (savedCustomColor && savedCustomColorRGB) {
          return {
            name: "custom",
            primary: savedCustomColor,
            color: savedCustomColorRGB,
          };
        }
      }

      if (savedThemeName) {
        const savedTheme = themes.find(
          (theme) => theme.name === savedThemeName
        );
        if (savedTheme) {
          return savedTheme;
        }
      }

      return themes[0];
    }
    return themes[0];
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClickM = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };

  const colorTheme = (theme: string): void => {
    try {
      const root = document.documentElement;
      const currentTheme = getComputedStyle(root)
        .getPropertyValue("--card-rgb")
        .trim();

      if (currentTheme === theme) return;

      root.style.setProperty("--card-rgb", theme);
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error changing theme:", error);
    }
  };

  const handleThemeClick = (theme: Theme) => {
    setCurrentTheme(theme);
    colorTheme(theme.color || "19, 19, 20");
    localStorage.setItem("themePreference", "default");
    localStorage.setItem("themeName", theme.name);
  };

  const handleCustomColorChange = () => {
    try {
      const rgbColor = hexToRgb(customColor);
      if (rgbColor) {
        const rgbString = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
        const customTheme: Theme = {
          name: "custom",
          primary: customColor,
          color: rgbString,
        };
        setCurrentTheme(customTheme);
        colorTheme(rgbString);
        localStorage.setItem("customColor", customColor);
        localStorage.setItem("customColorRGB", rgbString);
        localStorage.setItem("themePreference", "custom");
        localStorage.removeItem("themeName");
      }
    } catch (error) {
      console.error("Error saving custom color:", error);
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const languageSwitcher = (
    menuItem: string,
    popupState: { close: () => void }
  ): (() => void) => {
    return () => {
      try {
        setLanguage(menuItem);
        localStorage.setItem("language", menuItem);
        window.dispatchEvent(new Event("storage"));
        popupState.close();
      } catch (error) {
        console.error("Error switching language:", error);
      }
    };
  };

  const navItems: NavItem[] = [
    {
      name: translate.get(language!, "Comps.page.home"),
      class: "home",
      src: "House",
      path: "/",
    },
    {
      name: translate.get(language!, "Comps.page.projects"),
      class: "projects",
      src: "Folder",
      path: "/projects",
    },
    {
      name: translate.get(language!, "Comps.page.info"),
      class: "info",
      src: "Info",
      path: "/info",
    },
  ];

  return (
    <TransitionEffect>
      {Birthday({})}
      <div className="parent center">
        <div className="card boxes" id="confetti-wrapper">
          <div className="sliderSide">
            <ToolTip
              content={translate.get(language!, "Comps.page.settings")}
              placement="top"
            >
              <span
                aria-describedby="settings"
                onClick={handleClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                className={
                  Boolean(anchor) ? "dot settings settingsHigh" : "dot settings"
                }
              >
                <Image
                  style={{ opacity: 0.8 }}
                  src="/Gear.svg"
                  width={17}
                  height={17}
                  draggable={false}
                  alt="Gear settings"
                  priority
                />
              </span>
            </ToolTip>
            <div
              style={{
                display: "inline-block",
                width: "60%",
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.05)",
                margin: "15px 0",
              }}
            ></div>
            <Navigation items={navItems} pathname={pathname} />
            <Popover
              id="settings"
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={() => setAnchor(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  backgroundImage: "none",
                  overflow: "visible",
                },
              }}
            >
              <SettingsComponents
                language={language}
                setLanguage={setLanguage}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
                customColor={customColor}
                setCustomColor={setCustomColor}
              />
            </Popover>
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
                zIndex: 999,
              }}
            >
              <div className="mobileSliderSide">
                <ToolTip
                  content={translate.get(language!, "Comps.page.settings")}
                  placement="top"
                >
                  <span
                    aria-describedby="settingsM"
                    onClick={handleClickM}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                    className={
                      drawerOpen ? "dot settings settingsHigh" : "dot settings"
                    }
                  >
                    <Image
                      style={{ opacity: 0.8 }}
                      src="/Gear.svg"
                      width={17}
                      height={17}
                      draggable={false}
                      alt="Gear settings"
                      priority
                    />
                  </span>
                </ToolTip>
                <div
                  style={{
                    display: "inline-block",
                    width: "1px",
                    height: "60%",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    margin: "0 15px",
                  }}
                ></div>
                <MobileNavigation items={navItems} pathname={pathname} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SettingsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        language={language}
        onLanguageSwitch={languageSwitcher}
        themes={themes}
        currentTheme={currentTheme}
        customColor={customColor}
        onThemeClick={handleThemeClick}
        onCustomColorChange={handleCustomColorChange}
      />
    </TransitionEffect>
  );
}
