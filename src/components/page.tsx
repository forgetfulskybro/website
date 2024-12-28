"use client";
import React, { MouseEvent, ReactNode, useState, useEffect } from "react";
import TransitionEffect from "@/components/TransitionEffect";
import { Popover } from "@mui/material";
import { usePathname } from "next/navigation";
import Translate from "./translation";
import ToolTip from "./ToolTip";
import Image from "next/image";
import { Theme, MenuItem, NavItem } from "./types";
import { SettingsCard } from "./StyledComponents";
import ThemeSelector from "./ThemeSelector";
import LanguageMenu from "./LanguageMenu";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import SettingsDrawer from "./Drawers/SettingsDrawer";

const themes: Theme[] = [
  { name: "dark", primary: "#131314", color: "19, 19, 20" },
  { name: "shrimp", primary: "#FF8C82", color: "255, 140, 130" },
  { name: "chant", primary: "#3F295A", color: "63, 41, 90" },
  { name: "smurf", primary: "#62C3ED", color: "98, 195, 237" },
];

export default function Page({ children }: { children: ReactNode }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [anchorM, setAnchorM] = useState<HTMLElement | null>(null);
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
  const handleProjectClick = () => {
    setDrawerOpen(true);
  };
  const [showCustomPicker, setShowCustomPicker] = useState(false);
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

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClickM = (event: MouseEvent<HTMLElement>) => {
    setAnchorM(anchorM ? null : event.currentTarget);
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
    setShowCustomPicker(false);
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
        setShowCustomPicker(false);
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

  const menuArray: MenuItem[] = [
    {
      small: "en_EN",
      large: new Translate().get(language!, "Comps.page.languages.english"),
    },
    {
      small: "es_ES",
      large: new Translate().get(language!, "Comps.page.languages.spanish"),
    },
    {
      small: "fr_FR",
      large: new Translate().get(language!, "Comps.page.languages.french"),
    },
    {
      small: "ds_DS",
      large: new Translate().get(language!, "Comps.page.languages.danSucks"),
    },
    {
      small: "ec_EC",
      large: new Translate().get(language!, "Comps.page.languages.enchant"),
    },
  ];

  const navItems: NavItem[] = [
    {
      name: new Translate().get(language!, "Comps.page.home"),
      class: "home",
      src: "House",
      path: "/",
    },
    {
      name: new Translate().get(language!, "Comps.page.projects"),
      class: "projects",
      src: "Folder",
      path: "/projects",
    },
    {
      name: new Translate().get(language!, "Comps.page.info"),
      class: "info",
      src: "Info",
      path: "/info",
    },
  ];

  useEffect(() => {
    const themePreference = localStorage.getItem("themePreference");
    const savedThemeName = localStorage.getItem("themeName");

    if (themePreference === "custom") {
      const savedCustomColor = localStorage.getItem("customColor");
      const savedCustomColorRGB = localStorage.getItem("customColorRGB");

      if (savedCustomColor && savedCustomColorRGB) {
        const savedTheme: Theme = {
          name: "custom",
          primary: savedCustomColor,
          color: savedCustomColorRGB,
        };
        setCurrentTheme(savedTheme);
        colorTheme(savedCustomColorRGB);
      }
    } else if (savedThemeName) {
      const savedTheme = themes.find((theme) => theme.name === savedThemeName);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
        colorTheme(savedTheme.color || "19, 19, 20");
      }
    }
  }, []);

  const renderSettingsContent = () => (
    <SettingsCard>
      <LanguageMenu
        language={language}
        menuArray={menuArray}
        onLanguageSwitch={languageSwitcher}
      />
      <ThemeSelector
        themes={themes}
        currentTheme={currentTheme}
        language={language}
        customColor={customColor}
        onThemeClick={handleThemeClick}
        onCustomColorChange={handleCustomColorChange}
      />
    </SettingsCard>
  );

  return (
    <TransitionEffect>
      <div className="parent center">
        <div className="card boxes" id="confetti-wrapper">
          <div className="sliderSide boxes">
            <ToolTip
              content={new Translate().get(language!, "Comps.page.settings")}
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
                  src={`Gear.svg`}
                  width={17}
                  height={17}
                  draggable={false}
                  alt={"Gear settings"}
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
              id={"settings"}
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={handleClick}
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
              {renderSettingsContent()}
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
                zIndex: 9999,
              }}
            >
              <div className="mobileSliderSide">
                <ToolTip content="Settings" placement="top">
                  <span
                    aria-describedby="settingsM"
                    onClick={handleProjectClick}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                    className={
                      Boolean(anchorM)
                        ? "dot settings settingsHigh"
                        : "dot settings"
                    }
                  >
                    <Image
                      style={{ opacity: 0.8 }}
                      src={`Gear.svg`}
                      width={17}
                      height={17}
                      draggable={false}
                      alt={"Gear settings"}
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
          </div>
        </div>
      </div>
    </TransitionEffect>
  );
}
