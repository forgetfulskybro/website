import { DialogTitle, Typography } from "@mui/material";
import Link from "next/link";
import { ThemeColors } from "./theme";
import { formatNumber } from "./utils";
import ToolTip from "@/components/ToolTip";

interface DialogHeaderProps {
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
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({
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
}) => {
  return (
    <DialogTitle 
      sx={{ 
        backgroundColor: 'transparent', 
        '& a': { 
          color: themeColors.main,
          textDecoration: 'none',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: themeColors.light
          }
        }
      }}
    >
      <Link href={url || "https://example.com"} target="_blank">
        {title ? `${artist} - ${title}` : "Loading Song"}
      </Link>
      <Typography
        variant="inherit"
        sx={{ 
          color: "#fff", 
          marginLeft: "-4px",
          marginTop: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          '& > div': {
            margin: 0,
          },
          '& .songTag': {
            display: 'inline-block',
            padding: '4px 12px',
            margin: 0,
            borderRadius: '16px',
            fontSize: '0.75rem',
            backgroundColor: `${themeColors.dark}40`,
            color: themeColors.lighter,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            '&:hover': {
              backgroundColor: `${themeColors.dark}80`,
              color: '#fff'
            }
          }
        }}
      >
        {tags?.map((tag) => (
          <div key={tag?.name}>
            <a
              href={tag?.url}
              target="_blank"
              className="songTag"
            >
              {tag?.name}
            </a>
          </div>
        ))}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          marginTop: "10px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {duration && started ? (
          <>
            <span style={{ 
              color: themeColors.light,
              fontWeight: 500
            }}>
              {elapsedTime}
            </span>
            <div
              style={{
                position: "relative",
                width: "80px",
                height: "4px",
                marginLeft: "4px"
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
                  transition: 'transform 0.5s linear'
                }}
              />
            </div>
            <span style={{ 
              color: themeColors.light,
              fontWeight: 500
            }}>
              {formatDuration(duration)}
            </span>
          </>
        ) : (
          <ToolTip content={"Unknown Duration"} placement="bottom">
            <span style={{ 
              color: themeColors.light,
              fontWeight: 500
            }}>00:00</span>
          </ToolTip>
        )}
        {listeners && (
          <ToolTip content={"Listeners"} placement="bottom">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
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
              <span style={{ 
                color: themeColors.light,
                fontWeight: 500,
                fontSize: '0.85rem'
              }}>
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
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
              <span style={{ 
                color: themeColors.lighter,
                fontWeight: 500,
                fontSize: '0.85rem'
              }}>
                {formatNumber(playcount)}
              </span>
            </div>
          </ToolTip>
        )}
      </Typography>
    </DialogTitle>
  );
};
