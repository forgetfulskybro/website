import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton, Menu } from '@mui/material';
import { styled } from '@mui/material/styles';
import Translate from "./translation";
import { Theme } from './types';
import ToolTip from './ToolTip';

const ColorSquare = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '110px',
  borderRadius: '12px',
  marginBottom: '12px',
  cursor: 'crosshair',
  position: 'relative',
  background: 'linear-gradient(to right, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)',
  backdropFilter: 'blur(8px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 100%)',
    borderRadius: 'inherit',
    pointerEvents: 'none'
  }
}));

const ColorInputWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -1,
    borderRadius: '9px',
    padding: '1px',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none'
  }
}));

const ColorInput = styled('input')(({ theme }) => ({
  flex: 1,
  height: '36px',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'rgba(0,0,0,0.2)',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.2s ease',
  '&:focus': {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  '&::placeholder': {
    color: 'rgba(255,255,255,0.5)',
  }
}));

const ColorPreview = styled(Box)(({ theme }) => ({
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -1,
    borderRadius: '9px',
    padding: '1px',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  }
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hexValue, setHexValue] = useState(customColor);
  const [pickerPosition, setPickerPosition] = useState<{ x: number; y: number } | null>(null);
  const colorSquareRef = useRef<HTMLDivElement>(null);

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
    if (event.key === 'Enter' && /^#[0-9A-F]{6}$/i.test(hexValue)) {
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
        name: 'custom',
        primary: color,
        color: rgbString
      };
      onThemeClick(customTheme);
      localStorage.setItem('customColor', color);
      localStorage.setItem('customColorRGB', rgbString);
      localStorage.setItem('themePreference', 'custom');
      localStorage.removeItem('themeName');
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getColorFromPosition = (x: number, y: number, width: number, height: number): string => {
    const hue = (x / width) * 360;
    const saturation = 1;
    const lightness = 1 - (y / height);

    const h = hue;
    const s = saturation;
    const l = lightness;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x1 = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;
    let r1, g1, b1;

    if (h >= 0 && h < 60) {
        r1 = c; g1 = x1; b1 = 0;
    } else if (h >= 60 && h < 120) {
        r1 = x1; g1 = c; b1 = 0;
    } else if (h >= 120 && h < 180) {
        r1 = 0; g1 = c; b1 = x1;
    } else if (h >= 180 && h < 240) {
        r1 = 0; g1 = x1; b1 = c;
    } else if (h >= 240 && h < 300) {
        r1 = x1; g1 = 0; b1 = c;
    } else {
        r1 = c; g1 = 0; b1 = x1;
    }

    const r = Math.round((r1 + m) * 255);
    const g = Math.round((g1 + m) * 255);
    const b = Math.round((b1 + m) * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const handleColorSquareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!colorSquareRef.current) return;
    
    const rect = colorSquareRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    setPickerPosition({ 
      x: relativeX,
      y: relativeY
    });
    
    const color = getColorFromPosition(relativeX, relativeY, rect.width, rect.height);
    handleColorSelect(color);
  };

  const handleColorSquareMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handleColorSquareClick(e);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, mb: 1 }}>
        {themes.map((theme) => (
          <ToolTip
            key={theme.name}
            content={new Translate().get(language!, `Comps.page.${theme.name}`)}
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
                position: 'relative',
                '&::after': theme.name === currentTheme.name ? {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '14px',
                  height: '14px',
                  backgroundImage: 'url("check.svg")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0) invert(1)',
                } : {},
              }}
            />
          </ToolTip>
        ))}
        <ToolTip
          content={new Translate().get(language!, "Comps.page.custom")}
          placement="top"
        >
          <IconButton
            onClick={handleClick}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: currentTheme.name === 'custom' ? currentTheme.primary : '#808080',
              "&:hover": {
                backgroundColor: currentTheme.name === 'custom' ? currentTheme.primary : '#808080',
                opacity: 0.8,
              },
              position: 'relative',
              '&::after': currentTheme.name === 'custom' ? {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '14px',
                height: '14px',
                backgroundImage: 'url("check.svg")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0) invert(1)',
              } : {},
            }}
          />
        </ToolTip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent !important',
            backgroundImage: 'none !important',
            padding: 0,
            width: '320px',
            maxWidth: '90vw',
          }
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
            backgroundImage: 'none !important',
          },
          '& .MuiMenu-paper': {
            mt: '-16px',
            ml: '-43.5px',
          },
          '& .MuiMenu-list': {
            padding: '14px',
            backgroundColor: 'rgba(23,23,23,0.7)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'rgba(255,255,255,0.9)' }}>
          {new Translate().get(language!, "Comps.page.customColor")}
        </Typography>

        <Box sx={{ position: 'relative', width: '100%' }}>
          <ColorSquare 
            ref={colorSquareRef}
            onMouseMove={handleColorSquareMove}
            onClick={handleColorSquareClick}
          />
          {pickerPosition && (
            <div
              style={{
                position: 'absolute',
                width: '12px',
                height: '12px',
                border: '1.5px solid #FFFFFF',
                borderRadius: '2px',
                left: `${pickerPosition.x}px`,
                top: `${pickerPosition.y}px`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: hexValue,
                boxShadow: '0 0 0 0.5px #000000',
                pointerEvents: 'none',
                zIndex: 1000,
              }}
            />
          )}
        </Box>

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
