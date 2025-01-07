"use client";
import { Tooltip, TooltipProps, Zoom, styled } from "@mui/material";
import React from "react";

const StyledTooltip = styled(({ className: className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: "rgba(34, 34, 38)",
    color: theme.palette.common.white,
    borderRadius: 9,
    padding: theme.spacing(0.5),
  }
}));


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
    <StyledTooltip
      TransitionComponent={Zoom}
      title={content}
      placement={placement}
      disableFocusListener
      arrow={false}
    >
      {children}
    </StyledTooltip>
  );
}