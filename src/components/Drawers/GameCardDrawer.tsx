import { DrawerHeader, StyledDrawer } from "./DrawerStyles";
import { renderButtons } from "../layout/Projects";
import { Typography } from "@mui/material";
import { GameType } from "../GamesArray";
import Box from "@mui/material/Box";
import Image from "next/image";
import * as React from "react";

export default function TemporaryDrawer({
  open,
  onClose,
  selectedGame,
}: {
  open: boolean;
  onClose: () => void;
  selectedGame: GameType | null;
}) {
  return (
    <div>
      <StyledDrawer anchor={"bottom"} open={open} onClose={onClose}>
        <DrawerHeader>
          <Box display="flex" alignItems="center" justifyContent="center">
            {selectedGame?.image && (
              <Image
                src={selectedGame.image}
                alt="Project Icon"
                style={{
                  width: 32,
                  height: 32,
                  marginRight: 10,
                  borderRadius: 4,
                }}
                width={32}
                height={32}
                draggable={false}
              />
            )}
            <Typography variant="h5" align="center">
              {selectedGame?.title}
            </Typography>
          </Box>
        </DrawerHeader>
        <Box className="tooltip-drawer-container">
          <Box
            display="flex"
            flexDirection="row"
            gap="12px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className="tooltip-section" flex="1">
              <Typography className="tooltip-title">Progress</Typography>
              <Typography className="tooltip-text">
                {selectedGame?.progress}
              </Typography>
            </Box>
            <Box className="tooltip-section">
              {renderButtons(selectedGame?.website!, "Visit Website")}
            </Box>
          </Box>
          <Box
            className="tooltip-section"
          >
            <Typography className="tooltip-title">Review</Typography>
            <Typography className="tooltip-text">
              {selectedGame?.review
                ? selectedGame.review
                : "There is no review for this game."}
            </Typography>
          </Box>
        </Box>
      </StyledDrawer>
    </div>
  );
}
