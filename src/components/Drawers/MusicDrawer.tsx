"use client";
import {
  DrawerHeader,
  StyledDrawer,
  Container,
  SettingsCard,
} from "./DrawerStyles";
import { formatDistanceToNow, isYesterday, setDefaultOptions } from "date-fns";
import { es, fr } from "date-fns/locale";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import Translate from "@/components/translation";
import { ThemeColors } from "../Lyrics/theme";
import { formatNumber } from "../Lyrics/utils";
import ToolTip from "@/components/ToolTip";
import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { DialogContent, DialogContentText } from "@mui/material";

interface MusicDrawerProps {
  open: boolean;
  onClose: () => void;
  playing: boolean;
  themeColors: ThemeColors;
  url: string;
  artist: string;
  title: string;
  tags: any[];
  listeners?: number;
  playcount?: number;
  elapsedTime: string;
  duration?: number;
  started?: string;
  getProgress: () => number;
  formatDuration: (duration: number | undefined) => string;
  data: string;
  date?: number;
  lyrics: string | null | undefined;
}

export default function MusicDrawer({
  open,
  onClose,
  playing,
  themeColors,
  url,
  artist,
  title,
  tags,
  listeners,
  playcount,
  elapsedTime,
  duration,
  started,
  getProgress,
  formatDuration,
  data,
  date,
  lyrics,
}: MusicDrawerProps) {
  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (data == "es_ES") setDefaultOptions({ locale: es });
  else if (data == "fr_FR") setDefaultOptions({ locale: fr });

  const absoluteDate = React.useMemo(() => {
    if (!date) return;

    return new Date(date * 1000);
  }, [date]);

  const relativeDate = React.useMemo(() => {
    if (!absoluteDate) return;

    return isYesterday(absoluteDate)
      ? new Translate().get(data!, "Info.yester")
      : capitalize(formatDistanceToNow(absoluteDate, { addSuffix: true }));
  }, [absoluteDate, data]);

  const list = () => (
    <Container>
      <DrawerHeader>
        <Typography variant="h5" align="center">
          {playing && (
            <Image
              src="/music.svg"
              className="musicIcon"
              height={20}
              width={20}
              draggable={false}
              alt="Music"
              priority={true}
            />
          )}
          {absoluteDate ? (
            <time dateTime={absoluteDate.toISOString()}>{relativeDate}</time>
          ) : (
            <span>
              {playing ? (
                `${new Translate().get(data!, "Info.listening")}...`
              ) : (
                <svg
                  className="container"
                  x="0px"
                  y="0px"
                  viewBox="0 0 50 31.25"
                  height="31.25"
                  width="50"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    className="track"
                    strokeWidth="4"
                    fill="none"
                    pathLength="100"
                    d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
                  />
                  <path
                    className="car"
                    strokeWidth="4"
                    fill="none"
                    pathLength="100"
                    d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
                  />
                </svg>
              )}
            </span>
          )}
        </Typography>
      </DrawerHeader>
      <Divider />
      <SettingsCard sx={{ width: "100%", maxWidth: "500px", p: 2 }}>
        <Box sx={{ width: "100%" }}>
          <Link
            href={url || "https://example.com"}
            target="_blank"
            style={{
              color: themeColors.main,
              textDecoration: "none",
              transition: "color 0.2s ease",
              fontSize: "1.25rem",
              fontWeight: 500,
              justifyContent: "center",
              display: "block",
              textAlign: "center",
              width: "100%",
            }}
          >
            {title ? `${artist} - ${title}` : "Loading Song"}
          </Link>

          <Box
            sx={{
              color: "#fff",
              mt: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              "& > div": {
                margin: 0,
              },
              "& .songTag": {
                display: "inline-block",
                padding: "4px 12px",
                margin: 0,
                borderRadius: "16px",
                fontSize: "0.75rem",
                backgroundColor: `${themeColors.dark}40`,
                color: themeColors.lighter,
                textDecoration: "none",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: `${themeColors.dark}80`,
                  color: "#fff",
                },
              },
            }}
          >
            {tags?.map((tag) => (
              <div key={tag?.name}>
                <a href={tag?.url} target="_blank" className="songTag">
                  {tag?.name}
                </a>
              </div>
            ))}
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {listeners && (
              <ToolTip content={"Listeners"} placement="bottom">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                      fill={themeColors.light}
                      fillOpacity="0.8"
                    />
                  </svg>
                  <span
                    style={{
                      color: themeColors.light,
                      fontWeight: 500,
                      fontSize: "0.85rem",
                    }}
                  >
                    {formatNumber(listeners)}
                  </span>
                </div>
              </ToolTip>
            )}
            {listeners && playcount && (
              <svg
                width="12"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: "0 2px" }}
              >
                <path
                  d="M8 15.5V0.5H7.5V15.5H8ZM10.5 15.5H11V0.5H10.5V15.5Z"
                  fill={`${themeColors.dark}80`}
                />
              </svg>
            )}
            {playcount && (
              <ToolTip content={"Scrobbles"} placement="bottom">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12ZM10 19C8.9 19 8 18.1 8 17C8 15.9 8.9 15 10 15C11.1 15 12 15.9 12 17C12 18.1 11.1 19 10 19Z"
                      fill={themeColors.lighter}
                      fillOpacity="0.8"
                    />
                  </svg>
                  <span
                    style={{
                      color: themeColors.lighter,
                      fontWeight: 500,
                      fontSize: "0.85rem",
                    }}
                  >
                    {formatNumber(playcount)}
                  </span>
                </div>
              </ToolTip>
            )}
          </Box>

          <Box
            sx={{
              mt: 2,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {duration && started ? (
              <>
                <span
                  style={{
                    color: themeColors.light,
                    fontWeight: 500,
                  }}
                >
                  {elapsedTime}
                </span>
                <div
                  style={{
                    position: "relative",
                    width: "120px",
                    height: "4px",
                    marginLeft: "4px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: themeColors.dark,
                      borderRadius: "2px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: themeColors.lighter,
                      borderRadius: "2px",
                      transform: `scaleX(${getProgress()})`,
                      transformOrigin: "left",
                      transition: "transform 0.5s linear",
                    }}
                  />
                </div>
                <span
                  style={{
                    color: themeColors.light,
                    fontWeight: 500,
                  }}
                >
                  {formatDuration(duration)}
                </span>
              </>
            ) : (
              <ToolTip content={"Unknown Duration"} placement="bottom">
                <span
                  style={{
                    color: themeColors.light,
                    fontWeight: 500,
                  }}
                >
                  00:00
                </span>
              </ToolTip>
            )}
          </Box>

          <Box
            sx={{
              mt: 3,
              maxHeight: "40vh",
              overflowY: "auto",
              bgcolor: `${themeColors.dark}20`,
              borderRadius: "8px",
              p: 2,
              border: `1px solid ${themeColors.dark}40`,
            }}
          >
            {lyrics ? (
              <DialogContentText
                sx={{
                  color: "#fff",
                  whiteSpace: "pre-line",
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontSize: "0.9rem",
                  "& strong, & b": {
                    color: themeColors.lighter,
                    fontWeight: 600,
                  },
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: `${themeColors.dark}20`,
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: themeColors.lighter,
                    borderRadius: "4px",
                    "&:hover": {
                      background: `${themeColors.lighter}cc`,
                    },
                  },
                }}
              >
                {lyrics}
              </DialogContentText>
            ) : (
              <Typography
                sx={{
                  color: themeColors.light,
                  opacity: 0.7,
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Can&apos;t find lyrics for this song.
              </Typography>
            )}
          </Box>
        </Box>
      </SettingsCard>
      <Divider />
    </Container>
  );

  return (
    <div>
      <StyledDrawer anchor={"bottom"} open={open} onClose={onClose}>
        {list()}
      </StyledDrawer>
    </div>
  );
}
