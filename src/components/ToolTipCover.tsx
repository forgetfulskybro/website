"use client";
import { Tooltip, Zoom } from "@mui/material";
import React from "react";

export default function ToolTipCover({
  children,
  content,
  placement,
}: {
  children: React.ReactElement<any, any>;
  content: any;
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
        disableFocusListener
      >
        {children}
      </Tooltip>
    </>
  );
}
