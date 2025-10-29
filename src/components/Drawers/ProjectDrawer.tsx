import {
  DrawerHeader,
  StyledDrawer,
  ButtonContainer,
  StyledButton,
} from "./DrawerStyles";
import Translate from "@/components/translation";
import { Typography } from "@mui/material";
import { ProjectData } from "../ProjectsArray";
import Box from "@mui/material/Box";
import Image from "next/image";
import * as React from "react";

const translation = new Translate();

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
