"use client";
import { LastFMSong } from "@/hooks/LastFMSong";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Lyrics({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    artist,
    title,
    url,
    lyrics,
    duration,
    listeners,
    playcount,
    tags,
    started,
  } = LastFMSong();

  const formatDuration = (duration: number | undefined) => {
    const minutes = Math.floor(duration! / 60000);
    const seconds = Math.floor((duration! % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open && started) {
      const startTime = new Date(started).getTime();
      interval = setInterval(() => {
        const elapsedSeconds = Math.floor(
          (new Date().getTime() - startTime) / 1000
        );
        setElapsedTime(formatDuration(elapsedSeconds * 1000));
        if (
          formatDuration(elapsedSeconds * 1000) === formatDuration(duration)
        ) {
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [open, started, duration]);

  <span style={{ color: "#642D8E", marginRight: "6px" }}>{elapsedTime}</span>;

  if (lyrics)
    return (
      <>
        <div onClick={handleClickOpen}>{children}</div>
        <Dialog
          sx={{ maxHeight: "90vh", top: 36 }}
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle sx={{ backgroundColor: "#0E0E0E", color: "#642D8E" }}>
            <Link href={url ? url : "https://example.com"} target="_blank">
              {title ? `${artist} - ${title}` : "Loading Song"}
            </Link>
            <Typography
              variant="inherit"
              sx={{ color: "#fff", marginLeft: "-4px" }}
            >
              {tags?.map((tag) => (
                <>
                  <a
                    key={tag?.name}
                    href={tag?.url}
                    target="_blank"
                    className="songTag"
                  >
                    {tag?.name}
                  </a>
                </>
              ))}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                marginTop: "10px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {duration && started && (
                <>
                  <span style={{ color: "#642D8E", marginRight: "6px" }}>
                    {elapsedTime}
                  </span>
                  <div
                    style={{
                      marginLeft: "-5px",
                      width: "80px",
                      height: "4px",
                      backgroundColor: "#642D8E",
                      borderRadius: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: `${
                          ((new Date().getTime() -
                            new Date(started).getTime()) /
                            duration) *
                          100
                        }%`,
                        height: "4px",
                        backgroundColor: "#9664D1",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                  <span style={{ color: "#642D8E" }}>
                    {formatDuration(duration)}
                  </span>
                </>
              )}
              {duration && listeners && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15.5V0.5H7.5V15.5H8ZM10.5 15.5H11V0.5H10.5V15.5Z"
                    fill="#642D8E"
                  />
                </svg>
              )}
              {listeners && (
                <span style={{ color: "#9664D1" }}>
                  {listeners > 999
                    ? listeners > 999999
                      ? `${(listeners / 1000000).toFixed(1)}M`
                      : `${(listeners / 1000).toFixed(1)}K`
                    : listeners
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              )}
              {listeners && playcount && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15.5V0.5H7.5V15.5H8ZM10.5 15.5H11V0.5H10.5V15.5Z"
                    fill="#9664D1"
                  />
                </svg>
              )}
              {playcount && (
                <span style={{ color: "#A78BFA" }}>
                  {playcount > 999
                    ? playcount > 999999
                      ? `${(playcount / 1000000).toFixed(1)}M`
                      : `${(playcount / 1000).toFixed(1)}K`
                    : playcount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              )}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#1e1e1e" }}>
            <DialogContentText
              sx={{ color: "#fff", whiteSpace: "pre-line", marginTop: "20px" }}
            >
              {lyrics ? lyrics : "Loading Lyrics"}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    );
  else
    return (
      <>
        <div onClick={handleClickOpen}>{children}</div>
        <Dialog
          sx={{ maxHeight: "90vh", top: 36 }}
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle sx={{ backgroundColor: "#0E0E0E", color: "#642D8E" }}>
            <Link href={url ? url : "https://example.com"} target="_blank">
              {title ? `${artist} - ${title}` : "Loading Song"}
            </Link>
            <Typography
              variant="inherit"
              sx={{ color: "#fff", marginLeft: "-4px" }}
            >
              {tags?.map((tag) => (
                <>
                  <a
                    key={tag?.name}
                    href={tag?.url}
                    target="_blank"
                    className="songTag"
                  >
                    {tag?.name}
                  </a>
                </>
              ))}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                marginTop: "10px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {duration && started && (
                <>
                  <span style={{ color: "#642D8E", marginRight: "6px" }}>
                    {elapsedTime}
                  </span>
                  <div
                    style={{
                      marginLeft: "-5px",
                      width: "80px",
                      height: "4px",
                      backgroundColor: "#642D8E",
                      borderRadius: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: `${
                          ((new Date().getTime() -
                            new Date(started).getTime()) /
                            duration) *
                          100
                        }%`,
                        height: "4px",
                        backgroundColor: "#9664D1",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                  <span style={{ color: "#642D8E" }}>
                    {formatDuration(duration)}
                  </span>
                </>
              )}
              {duration && listeners && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15.5V0.5H7.5V15.5H8ZM10.5 15.5H11V0.5H10.5V15.5Z"
                    fill="#642D8E"
                  />
                </svg>
              )}
              {listeners && (
                <span style={{ color: "#9664D1" }}>
                  {listeners > 999
                    ? listeners > 999999
                      ? `${(listeners / 1000000).toFixed(1)}M`
                      : `${(listeners / 1000).toFixed(1)}K`
                    : listeners
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              )}
              {listeners && playcount && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15.5V0.5H7.5V15.5H8ZM10.5 15.5H11V0.5H10.5V15.5Z"
                    fill="#9664D1"
                  />
                </svg>
              )}
              {playcount && (
                <span style={{ color: "#A78BFA" }}>
                  {playcount > 999
                    ? playcount > 999999
                      ? `${(playcount / 1000000).toFixed(1)}M`
                      : `${(playcount / 1000).toFixed(1)}K`
                    : playcount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              )}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#1e1e1e" }}>
            <DialogContentText
              sx={{ color: "#fff", whiteSpace: "pre-line", marginTop: "20px" }}
            >
              Loading Lyrics...
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    );
}
