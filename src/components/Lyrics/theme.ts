import { Theme } from "../types";

export interface ThemeColors {
  main: string;
  light: string;
  lighter: string;
  dark: string;
  darker: string;
}

export const defaultTheme: Theme = {
  name: "dark",
  primary: "rgb(100, 100, 100)", 
};

export function adjustColor(color: string, amount: number): string {
  const clamp = (num: number) => Math.min(255, Math.max(0, num));
  
  let rgb: number[] = [];
  if (color.startsWith('#')) {
    const hex = color.substring(1);
    rgb = [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16)
    ];
  } else {
    rgb = color.match(/\d+/g)?.map(Number) || [];
  }
  
  if (rgb.length !== 3) return color;

  const adjustedRgb = rgb.map(channel => clamp(channel + amount));
  return `rgb(${adjustedRgb.join(', ')})`;
}

export function generateColorVariants(baseColor: string): ThemeColors {
  return {
    main: baseColor,
    light: adjustColor(baseColor, 30),
    lighter: adjustColor(baseColor, 60),
    dark: adjustColor(baseColor, -30),
    darker: adjustColor(baseColor, -60),
  };
}

export const defaultColors: ThemeColors = generateColorVariants(defaultTheme.primary);
