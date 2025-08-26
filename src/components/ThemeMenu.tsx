import { Box, Typography, IconButton } from "@mui/material";
import { CustomColorPicker } from "./StyledComponents";
import Translate from "./translation";
import ToolTip from "./ToolTip";
import { Theme } from "./types";

interface ThemeMenuProps {
  themes: Theme[];
  language: string | null;
  currentTheme: Theme;
  showCustomPicker: boolean;
  customColor: string;
  onThemeClick: (theme: Theme) => void;
  onCustomColorClick: () => void;
  onCustomColorChange: () => void;
  setCustomColor: (color: string) => void;
}

export default function ThemeMenu({
  themes,
  language,
  currentTheme,
  showCustomPicker,
  customColor,
  onThemeClick,
  onCustomColorClick,
  onCustomColorChange,
  setCustomColor,
}: ThemeMenuProps) {
  const translate = new Translate();
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontSize: '0.9rem', opacity: 0.9 }}>
        {translate.get(language!, "Comps.page.colorTheme")}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, mb: 1 }}>
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
              }}
            />
          </ToolTip>
        ))}
        <ToolTip
          content={translate.get(language!, "Comps.page.custom")}
          placement="top"
        >
          <IconButton
            onClick={onCustomColorClick}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: currentTheme.name === 'custom' ? currentTheme.primary : '#808080',
              "&:hover": {
                backgroundColor: currentTheme.name === 'custom' ? currentTheme.primary : '#808080',
                opacity: 0.8,
              },
            }}
          />
        </ToolTip>
      </Box>
      
      {showCustomPicker && (
        <CustomColorPicker className="show" sx={{
          backgroundColor: 'rgba(23,23,23,0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '16px',
          width: '400px',
          maxWidth: '90vw',
          marginBottom: '8px',
        }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block', color: '#fff' }}>
            {translate.get(language!, "Comps.page.customColor")}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <input
              type="text"
              placeholder={currentTheme.primary}
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              style={{ 
                width: '100%',
                height: '32px',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                color: '#fff',
                padding: '0 8px'
              }}
            />
            <button
              onClick={onCustomColorChange}
              style={{ 
                minWidth: '60px',
                height: '32px',
                fontSize: '0.85rem',
                textTransform: 'lowercase',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {translate.get(language!, "Comps.page.apply")}
            </button>
          </Box>
        </CustomColorPicker>
      )}
    </Box>
  );
}
