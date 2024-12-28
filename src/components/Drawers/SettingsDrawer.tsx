import {
  DrawerHeader,
  StyledDrawer,
  SettingsCard,
  Container,
} from "./DrawerStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ThemeSelector from "../ThemeSelector";
import Divider from "@mui/material/Divider";
import LanguageMenu from "../LanguageMenu";
import { Theme, MenuItem } from "../types";
import Translate from "../translation";
import { useEffect } from "react";
import * as React from "react";

export default function SettingsDrawer({
  open,
  onClose,
  language,
  onLanguageSwitch,
  themes,
  currentTheme,
  customColor,
  onThemeClick,
  onCustomColorChange,
}: {
  open: boolean;
  onClose: () => void;
  language: string | null;
  onLanguageSwitch: (
    menuItem: string,
    popupState: { close: () => void }
  ) => () => void;
  themes: Theme[];
  currentTheme: Theme;
  customColor: string;
  onThemeClick: (theme: Theme) => void;
  onCustomColorChange: () => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!isMobile) {
      onClose();
    }
  }, [isMobile, onClose]);

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

  const list = () => (
    <Container>
      <DrawerHeader>
        <Typography variant="h5" align="center">
          Settings
        </Typography>
      </DrawerHeader>
      <Divider />
      <SettingsCard>
        <LanguageMenu
          language={language}
          menuArray={menuArray}
          onLanguageSwitch={onLanguageSwitch}
        />
        <ThemeSelector
          themes={themes}
          currentTheme={currentTheme}
          language={language}
          customColor={customColor}
          onThemeClick={onThemeClick}
          onCustomColorChange={onCustomColorChange}
        />
      </SettingsCard>
      <Divider />
    </Container>
  );

  return (
    <div>
      {isMobile && (
        <StyledDrawer anchor={"bottom"} open={open} onClose={onClose}>
          {list()}
        </StyledDrawer>
      )}
    </div>
  );
}
