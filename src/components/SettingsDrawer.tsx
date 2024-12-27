import * as React from "react";
import {  useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LanguageMenu from "./LanguageMenu";
import ThemeSelector from "./ThemeSelector";
import { Theme, MenuItem } from "./types";
import Translate from "./translation";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(23, 23, 23, 0.3)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#fff",
    borderRadius: "16px",
    padding: "12px",
  },
}));

const SettingsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: "300px",
  maxWidth: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  width: "100%",
  justifyContent: "center",
}));

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
