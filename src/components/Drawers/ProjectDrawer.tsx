import {
  DrawerHeader,
  StyledDrawer,
  ButtonContainer,
  StyledButton,
} from "./DrawerStyles";
import { Typography } from "@mui/material";
import { ProjectData } from "../ProjectsArray";
import Box from "@mui/material/Box";
import Image from "next/image";
import * as React from "react";

export default function TemporaryDrawer({
  open,
  onClose,
  selectedProject,
}: {
  open: boolean;
  onClose: () => void;
  selectedProject: ProjectData | null;
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
            Discord
          </StyledButton>
          <StyledButton
            href={selectedProject?.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!selectedProject?.website}
          >
            Website
          </StyledButton>
        </ButtonContainer>
      </StyledDrawer>
    </div>
  );
}
