"use client";
import { Tooltip, Zoom } from "@mui/material";
import React from "react";

export default function ToolTip({
  children,
  content,
  placement,
}: {
  children: React.ReactElement<any, any>;
  content: string;
  placement:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
    | undefined;
}) {
  return (
    <>
      <Tooltip
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -10],
                },
              },
            ],
          },
        }}
        TransitionComponent={Zoom}
        title={content}
        placement={placement}
        disableInteractive
      >
        {children}
      </Tooltip>
    </>
  );
}
