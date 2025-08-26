import { defaultColors, generateColorVariants } from "./Lyrics/theme";

export const updateThemeColor = (setThemeColors: (colors: any) => void) => {
  try {
    const storedTheme = localStorage.getItem("theme");
    const customColor = localStorage.getItem("customColor");
    let baseColor = defaultColors.main;

    if (customColor) {
      baseColor = customColor;
    } else if (storedTheme) {
      if (typeof storedTheme === "string" && storedTheme.trim() !== "") {
        try {
          const parsed = JSON.parse(storedTheme);
          baseColor = parsed?.primary || defaultColors.main;
        } catch (parseError) {
          const colorRegex = /^(\d{1,3},\s*\d{1,3},\s*\d{1,3})$/;
          if (colorRegex.test(storedTheme.trim())) {
            baseColor = `rgb(${storedTheme})`;
          } else {
            console.error(
              "Error parsing theme JSON, not a valid color:",
              parseError,
              "Raw value:",
              storedTheme
            );
            baseColor = defaultColors.main;
          }
        }
      } else {
        console.warn(
          "Stored theme is empty or invalid, using default color. Raw value:",
          storedTheme
        );
        baseColor = defaultColors.main;
      }
    }
    setThemeColors(generateColorVariants(baseColor));
  } catch (error) {
    setThemeColors(defaultColors);
  }
};
