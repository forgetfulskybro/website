"use client";
import styles from "../../app/projects/guildcount/guildcount.module.css";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface UserProfileProps {
  username: string | null;
  avatarUrl: string;
}

export default function UserProfile({ username, avatarUrl }: UserProfileProps) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    document.forms.namedItem("logoutForm")?.submit();
    handleClose();
  };

  const handleLogin = () => {
    const discordAuth = `https://discord.com/api/oauth2/authorize?client_id=1402036729791250522&redirect_uri=${`${baseURL}/api/discord`}&response_type=code&scope=identify%20guilds`;
    router.push(discordAuth);
    handleClose();
  };

  return (
    <div className={styles.userProfile} onClick={handleClick}>
      {username ? (
        <Image
          src={avatarUrl}
          alt="User Avatar"
          width={32}
          height={32}
          className={styles.userAvatar}
        />
      ) : (
        <div className={styles.uIcon}>U</div>
      )}
      <div className={styles.userInfo}>
        <Button
          className={styles.username}
          sx={{
            padding: 0,
            minWidth: 0,
            textTransform: "none",
            color: "#ffffff",
          }}
          disableRipple
        >
          {username || "Unknown"}
        </Button>
        {username && (
          <form
            action="/api/discord/logout"
            method="POST"
            name="logoutForm"
            style={{ display: "none" }}
          >
            <button type="submit">Logout</button>
          </form>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#2f3136",
              color: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              marginTop: "8px",
              "& .MuiMenuItem-root": {
                color: "#ffffff",
                fontSize: "14px",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#40444b",
                },
              },
            },
          }}
        >
          <MenuItem onClick={username ? handleLogout : handleLogin}>
            {username ? "Logout" : "Login"}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
