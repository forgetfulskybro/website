"use client";
import React, { useState, useEffect } from "react";
import { SettingsCard } from "../StyledComponents";
import ThemeSelector from "../ThemeSelector";
import { Theme, MenuItem } from "../types";
import LanguageMenu from "../LanguageMenu";
import Translate from "../translation";

export const themes: Theme[] = [
  { name: "dark", primary: "#626264", color: "98, 98, 100" },
  { name: "shrimp", primary: "#FF8C82", color: "255, 140, 130" },
  { name: "chant", primary: "#3F295A", color: "63, 41, 90" },
  { name: "smurf", primary: "#62C3ED", color: "98, 195, 237" },
];

interface SettingsComponentsProps {
  language: string | null;
  setLanguage: (language: string) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
}

export default function SettingsComponents({
  language,
  setLanguage,
  currentTheme,
  setCurrentTheme,
  customColor,
  setCustomColor,
}: SettingsComponentsProps) {
  const translate = new Translate();
  const [showCustomPicker, setShowCustomPicker] = useState(false);

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

  const menuArray: MenuItem[] = [
    {
      small: "en_EN",
      large: translate.get(language!, "Comps.page.languages.english"),
    },
    {
      small: "es_ES",
      large: translate.get(language!, "Comps.page.languages.spanish"),
    },
    {
      small: "fr_FR",
      large: translate.get(language!, "Comps.page.languages.french"),
    },
    {
      small: "ds_DS",
      large: translate.get(language!, "Comps.page.languages.danSucks"),
    },
    {
      small: "ec_EC",
      large: translate.get(language!, "Comps.page.languages.enchant"),
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
  }, [setCurrentTheme]);

  return (
    <>
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
    </>
  );
}