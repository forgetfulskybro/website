import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(34, 34, 38, 0.3)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#fff",
    padding: "12px",
  },
}));

export const ButtonContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const StyledButton = styled(
  ({ disabled, href, ...other }: { disabled: boolean; href: string } & any) => (
    <Link href={href} {...other} /> // Use the MUI Link component
  )
)(({ theme, disabled }) => ({
  width: "100%",
  borderRadius: "8px",
  textTransform: "none",
  textDecoration: "none",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  color: "#fff",
  padding: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: disabled ? "grey" : "#a0a0a0",
  },
  opacity: disabled ? 0.5 : 1,
  pointerEvents: disabled ? "none" : "auto",
  backgroundColor: disabled ? "grey" : "#606060",
}));

export const RatingItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
  width: "100%",
  alignItems: "center",
}));

export const BlueTypography = styled(Typography)(({ theme }) => ({
  color: "rgba(54, 54, 241, 0.99)",
  marginRight: theme.spacing(2),
}));

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
}));

export const ListContainer = styled("ul")(({ theme }) => ({
  width: "80%",
  listStyle: "none",
  padding: 0,
}));

export const SettingsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: "300px",
  maxWidth: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
