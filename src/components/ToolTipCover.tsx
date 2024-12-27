"use client";
import { Tooltip, TooltipProps, Theme, Zoom } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const ModernTooltip = styled((props: TooltipProps) => <Tooltip {...props} />)(
  ({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: "rgba(34, 34, 38, 0.3)",
      backdropFilter: "blur(12px)", // Ensure blur is applied
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "13px",
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: 'fit-content'
    },
  })
);

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
    <ModernTooltip
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
      arrow={false}
    >
      {children}
    </ModernTooltip>
  );
}