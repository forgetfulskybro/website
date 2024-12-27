import * as React from "react";
import Translate from "@components/translation";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Stack, Typography } from "@mui/material";
import { ProjectData } from "./Projects";
import Link from "@mui/material/Link";
import Image from "next/image";

const translation = new Translate();

const ButtonContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const StyledButton = styled(({ disabled, ...other }: any) => (
  <Link {...other} />
))(({ theme, disabled }) => ({
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center", // Center the title
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(34, 34, 38, 0.3)", // From .recentGamesBox etc.
    backdropFilter: "blur(12px)", // From .recentGamesBox etc.
    border: "1px solid rgba(255, 255, 255, 0.05)", // From .recentGamesBox etc.
    color: "#fff", // White text
    borderRadius: "8px 8px 0 0", // Top corners rounded
    padding: "12px", // Add padding similar to other boxes
  },
}));

export default function TemporaryDrawer({
  open,
  onClose,
  selectedProject,
  translate,
}: {
  open: boolean;
  onClose: () => void;
  selectedProject: ProjectData | null;
  translate: string;
}) {
  return (
    <div>
      <StyledDrawer anchor={"bottom"} open={open} onClose={onClose}>
        <DrawerHeader>
          <Box display="flex" alignItems="center">
            {selectedProject?.image && (
              <Image
                src={selectedProject.image}
                alt="Project Icon"
                style={{
                  width: 32,
                  height: 32,
                  marginRight: 10,
                  borderRadius: 25,
                }}
                width={32}
                height={32}
                draggable={false}
              />
            )}
            <Typography variant="h5" align="center">
              {selectedProject?.title}
            </Typography>
          </Box>
        </DrawerHeader>
        <ButtonContainer spacing={2}>
          <StyledButton
            href={selectedProject?.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!selectedProject?.github}
          >
            GitHub
          </StyledButton>
          <StyledButton
            href={selectedProject?.community || "#"}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!selectedProject?.community}
          >
            {translation.get(translate, "Projects.buttons.community")}
          </StyledButton>
          <StyledButton
            href={selectedProject?.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!selectedProject?.website}
          >
            {translation.get(translate, "Projects.buttons.website")}
          </StyledButton>
        </ButtonContainer>
      </StyledDrawer>
    </div>
  );
}
