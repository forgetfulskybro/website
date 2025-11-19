import { Box, Typography, IconButton, Menu } from "@mui/material";
import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Translate from "./translation";
import { Theme } from "./types";
import ToolTip from "./ToolTip";

const ColorPickerArea = styled(Box)(({ theme }) => ({
  width: "260px",
  height: "160px",
  cursor: "crosshair",
  position: "relative",
  marginBottom: "12px",
}));

const SaturationLightnessPicker = styled(Box)<{ hue: number }>(({ hue }) => ({
  width: "210px",
  height: "160px",
  borderRadius: "8px",
  cursor: "crosshair",
  position: "relative",
  background: `linear-gradient(to right, #ffffff, hsl(${hue}, 100%, 50%))`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
    borderRadius: "inherit",
    pointerEvents: "none",
  },
}));

const HueSlider = styled(Box)(({ theme }) => ({
  width: "30px",
  height: "160px",
  borderRadius: "4px",
  cursor: "crosshair",
  position: "relative",
  background:
    "linear-gradient(to bottom, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)",
}));

const ColorInputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: -1,
    borderRadius: "9px",
    padding: "1px",
    background:
      "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
}));

const ColorInput = styled("input")(({ theme }) => ({
  flex: 1,
  height: "36px",
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "rgba(0,0,0,0.2)",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s ease",
  "&:focus": {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  "&::placeholder": {
    color: "rgba(255,255,255,0.5)",
  },
}));

const ColorPreview = styled(Box)(({ theme }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  transition: "all 0.2s ease",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: -1,
    borderRadius: "9px",
    padding: "1px",
    background:
      "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  },
}));

interface ThemeSelectorProps {
  themes: Theme[];
  currentTheme: Theme;
  language: string | null;
  customColor: string;
  onThemeClick: (theme: Theme) => void;
  onCustomColorChange: (color: string) => void;
}

export default function ThemeSelector({
  themes,
  currentTheme,
  language,
  customColor,
  onThemeClick,
  onCustomColorChange,
}: ThemeSelectorProps) {
  const translate = new Translate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hexValue, setHexValue] = useState(customColor);
  const [pickerPosition, setPickerPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hueSliderPosition, setHueSliderPosition] = useState<number | null>(
    null,
  );
  const [currentHue, setCurrentHue] = useState<number>(0);
  const satLightRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      handleColorSelect(value);
    }
  };

  const handleHexKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && /^#[0-9A-F]{6}$/i.test(hexValue)) {
      handleColorSelect(hexValue);
      handleClose();
    }
  };

  const handleColorSelect = (color: string) => {
    setHexValue(color);
    const rgbColor = hexToRgb(color);
    if (rgbColor) {
      const rgbString = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
      const customTheme: Theme = {
        name: "custom",
        primary: color,
        color: rgbString,
      };
      onThemeClick(customTheme);
      localStorage.setItem("customColor", color);
      localStorage.setItem("customColorRGB", rgbString);
      localStorage.setItem("themePreference", "custom");
      localStorage.removeItem("themeName");
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

  const hslToHex = (h: number, s: number, l: number): string => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h * 12) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };

    const r = f(0);
    const g = f(8);
    const b = f(4);

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const getColorFromSatLight = (
    x: number,
    y: number,
    width: number,
    height: number,
    hue: number,
  ): string => {
    const saturation = (x / width) * 100;
    const lightness = 100 - (y / height) * 100;
    return hslToHex(hue, saturation, lightness);
  };

  const getHueFromPosition = (y: number, height: number): number => {
    return (y / height) * 360;
  };

  const handleSatLightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!satLightRef.current) return;

    const rect = satLightRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    setPickerPosition({
      x: relativeX,
      y: relativeY,
    });

    const color = getColorFromSatLight(
      relativeX,
      relativeY,
      rect.width,
      rect.height,
      currentHue,
    );
    handleColorSelect(color);
  };

  const handleSatLightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handleSatLightClick(e);
  };

  const handleHueClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hueSliderRef.current) return;

    const rect = hueSliderRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;

    setHueSliderPosition(relativeY);

    const hue = getHueFromPosition(relativeY, rect.height);
    setCurrentHue(hue);

    if (pickerPosition && satLightRef.current) {
      const satLightRect = satLightRef.current.getBoundingClientRect();
      const color = getColorFromSatLight(
        pickerPosition.x,
        pickerPosition.y,
        satLightRect.width,
        satLightRect.height,
        hue,
      );
      handleColorSelect(color);
    }
  };

  const handleHueMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handleHueClick(e);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", gap: 1, mb: 1 }}
      >
        {themes.map((theme) => (
          <ToolTip
            key={theme.name}
            content={translate.get(language!, `Comps.page.${theme.name}`)}
            placement="top"
          >
            <IconButton
              onClick={() => onThemeClick(theme)}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.primary,
                "&:hover": {
                  backgroundColor: theme.primary,
                  opacity: 0.8,
                },
                position: "relative",
                "&::after":
                  theme.name === currentTheme.name
                    ? {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "14px",
                        height: "14px",
                        backgroundImage: 'url("/check.svg")',
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        filter: "brightness(0) invert(1)",
                      }
                    : {},
              }}
            />
          </ToolTip>
        ))}
        <ToolTip
          content={translate.get(language!, "Comps.page.custom")}
          placement="top"
        >
          <IconButton
            onClick={handleClick}
            sx={{
              width: 32,
              height: 32,
              backgroundColor:
                currentTheme.name === "custom"
                  ? currentTheme.primary
                  : "#808080",
              "&:hover": {
                backgroundColor:
                  currentTheme.name === "custom"
                    ? currentTheme.primary
                    : "#808080",
                opacity: 0.8,
              },
              position: "relative",
              "&::after":
                currentTheme.name === "custom"
                  ? {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "14px",
                      height: "14px",
                      backgroundImage: 'url("/check.svg")',
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      filter: "brightness(0) invert(1)",
                    }
                  : {},
            }}
          />
        </ToolTip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "transparent !important",
            backgroundImage: "none !important",
            padding: 0,
            width: "320px",
            maxWidth: "90vw",
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent !important",
            backgroundImage: "none !important",
          },
          "& .MuiMenu-paper": {
            mt: "-16px",
            ml: "-43.5px",
          },
          "& .MuiMenu-list": {
            padding: "14px",
            backgroundColor: "rgba(23,23,23,0.7)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ mb: 1, color: "rgba(255,255,255,0.9)" }}
        >
          {translate.get(language!, "Comps.page.customColor")}
        </Typography>

        <ColorPickerArea sx={{ display: "flex", gap: "30px" }}>
          <SaturationLightnessPicker
            hue={currentHue}
            ref={satLightRef}
            onMouseMove={handleSatLightMove}
            onClick={handleSatLightClick}
          />
          <HueSlider
            ref={hueSliderRef}
            onMouseMove={handleHueMove}
            onClick={handleHueClick}
          />

          {pickerPosition && (
            <div
              style={{
                position: "absolute",
                width: "12px",
                height: "12px",
                border: "1.5px solid #FFFFFF",
                borderRadius: "50%",
                left: `${pickerPosition.x}px`,
                top: `${pickerPosition.y}px`,
                transform: "translate(-50%, -50%)",
                backgroundColor: hexValue,
                boxShadow: "0 0 0 0.5px #000000",
                pointerEvents: "none",
                zIndex: 1000,
              }}
            />
          )}

          {hueSliderPosition !== null && (
            <div
              style={{
                position: "absolute",
                width: "25px",
                height: "4px",
                border: "1px solid #FFFFFF",
                borderRadius: "2px",
                left: "233.5px",
                top: `${hueSliderPosition}px`,
                transform: "translateY(-50%)",
                backgroundColor: `hsl(${currentHue}, 100%, 50%)`,
                boxShadow: "0 0 0 0.5px #000000",
                pointerEvents: "none",
                zIndex: 1000,
              }}
            />
          )}
        </ColorPickerArea>

        <ColorInputWrapper>
          <ColorInput
            placeholder="#000000"
            value={hexValue}
            onChange={handleHexChange}
            onKeyDown={handleHexKeyDown}
          />
          <ColorPreview
            sx={{
              backgroundColor: hexValue,
            }}
          />
        </ColorInputWrapper>
      </Menu>
    </Box>
  );
}
