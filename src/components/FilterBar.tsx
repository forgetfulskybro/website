"use client";
import styles from "../app/projects/guildcount/guildcount.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Guild } from "../app/projects/guildcount/page";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  debounce,
} from "@mui/material";
import GuildCard from "./GuildCard";

const permissionMap = {
  0x1: {
    name: "Create Instant Invite",
    bitwise: 0x1,
    group: "general",
  },
  0x2: {
    name: "Kick Members",
    bitwise: 0x2,
    group: "general",
  },
  0x4: {
    name: "Ban Members",
    bitwise: 0x4,
    group: "general",
  },
  0x8: {
    name: "Administrator",
    bitwise: 0x8,
    group: "general",
  },
  0x10: {
    name: "Manage Channels",
    bitwise: 0x10,
    group: "general",
  },
  0x20: {
    name: "Manage Server",
    bitwise: 0x20,
    group: "general",
  },
  0x40: {
    name: "Add Reactions",
    bitwise: 0x40,
    group: "text",
  },
  0x80: {
    name: "View Audit Log",
    bitwise: 0x80,
    group: "general",
  },
  0x100: {
    name: "Priority Speaker",
    bitwise: 0x100,
    group: "voice",
  },
  0x200: {
    name: "Video",
    bitwise: 0x200,
    group: "voice",
  },
  0x400: {
    name: "Read Messages/View Channels",
    bitwise: 0x400,
    group: "general",
  },
  0x800: {
    name: "Send Messages",
    bitwise: 0x800,
    group: "text",
  },
  0x1000: {
    name: "Send TTS Messages",
    bitwise: 0x1000,
    group: "text",
  },
  0x2000: {
    name: "Manage Messages",
    bitwise: 0x2000,
    group: "text",
  },
  0x4000: {
    name: "Embed Links",
    bitwise: 0x4000,
    group: "text",
  },
  0x8000: {
    name: "Attach Files",
    bitwise: 0x8000,
    group: "text",
  },
  0x10000: {
    name: "Read Message History",
    bitwise: 0x10000,
    group: "text",
  },
  0x20000: {
    name: "Mention @everyone, @here, and All Roles",
    bitwise: 0x20000,
    group: "text",
  },
  0x40000: {
    name: "Use External Emojis",
    bitwise: 0x40000,
    group: "text",
  },
  0x80000: {
    name: "View Server Insights",
    bitwise: 0x80000,
    group: "general",
  },
  0x100000: {
    name: "Connect",
    bitwise: 0x100000,
    group: "voice",
  },
  0x200000: {
    name: "Speak",
    bitwise: 0x200000,
    group: "voice",
  },
  0x400000: {
    name: "Mute Members",
    bitwise: 0x400000,
    group: "voice",
  },
  0x800000: {
    name: "Deafen Members",
    bitwise: 0x800000,
    group: "voice",
  },
  0x1000000: {
    name: "Move Members",
    bitwise: 0x1000000,
    group: "voice",
  },
  0x2000000: {
    name: "Use Voice Activity",
    bitwise: 0x2000000,
    group: "voice",
  },
  0x4000000: {
    name: "Change Nickname",
    bitwise: 0x4000000,
    group: "general",
  },
  0x8000000: {
    name: "Manage Nicknames",
    bitwise: 0x8000000,
    group: "general",
  },
  0x10000000: {
    name: "Manage Roles",
    bitwise: 0x10000000,
    group: "general",
  },
  0x20000000: {
    name: "Manage Webhooks",
    bitwise: 0x20000000,
    group: "general",
  },
  0x40000000: {
    name: "Manage Emojis and Stickers",
    bitwise: 0x40000000,
    group: "general",
  },
  0x80000000: {
    name: "Use Application Commands",
    bitwise: 0x80000000,
    group: "text",
  },
  0x100000000: {
    name: "Request To Speak",
    bitwise: 0x100000000,
    group: "voice",
  },
  0x200000000: {
    name: "Manage Events",
    bitwise: 0x200000000,
    group: "general",
  },
  0x400000000: {
    name: "Manage Threads",
    bitwise: 0x400000000,
    group: "text",
  },
  0x800000000: {
    name: "Create Public Threads",
    bitwise: 0x800000000,
    group: "text",
  },
  0x1000000000: {
    name: "Create Private Threads",
    bitwise: 0x1000000000,
    group: "text",
  },
  0x2000000000: {
    name: "Use External Stickers",
    bitwise: 0x2000000000,
    group: "text",
  },
  0x4000000000: {
    name: "Send Messages in Threads",
    bitwise: 0x4000000000,
    group: "text",
  },
  0x8000000000: {
    name: "Use Embedded Activities",
    bitwise: 0x8000000000,
    group: "voice",
  },
  0x10000000000: {
    name: "Moderate Members",
    bitwise: 0x10000000000,
    group: "general",
  },
  0x20000000000: {
    name: "View Creator Monetization Insights",
    bitwise: 0x20000000000,
    group: "general",
  },
  0x40000000000: {
    name: "Use Soundboard",
    bitwise: 0x40000000000,
    group: "voice",
  },
  0x80000000000: {
    name: "Create Expressions",
    bitwise: 0x80000000000,
    group: "general",
  },
  0x100000000000: {
    name: "Create Events",
    bitwise: 0x100000000000,
    group: "general",
  },
  0x200000000000: {
    name: "Use External Sounds",
    bitwise: 0x200000000000,
    group: "voice",
  },
  0x400000000000: {
    name: "Send Voice Message",
    bitwise: 0x400000000000,
    group: "text",
  },
  0x800000000000: {
    name: "Use Clyde AI",
    bitwise: 0x800000000000,
    group: "general",
  },
  0x1000000000000: {
    name: "Set Voice Channel Status",
    bitwise: 0x1000000000000,
    group: "voice",
  },
  0x2000000000000: {
    name: "Send Polls",
    bitwise: 0x2000000000000,
    group: "text",
  },
  0x4000000000000: {
    name: "Use External Applications",
    bitwise: 0x4000000000000,
    group: "text",
  },
};

export default function FilterBar({ guilds }: { guilds: Guild[] }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const filterOptions = [
    { value: "owner", label: "Owner" },
    { value: "admin", label: "Admin" },
    { value: "verified", label: "Verified" },
    { value: "partnered", label: "Partnered" },
    { value: "staff", label: "Discord Staff" },
  ];
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const guildsWithPermissions = useMemo(() => {
    return guilds.map((guild: Guild) => {
      const permissions = {
        general: [],
        text: [],
        voice: [],
      } as any;
      const permValue = parseInt(guild.permissions.toString());
      for (const [bit, info] of Object.entries(permissionMap)) {
        if (permValue & info.bitwise) {
          permissions[info.group].push(info.name);
        }
      }
      return { ...guild, permissionsObj: permissions };
    });
  }, [guilds]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 300),
    []
  );

  const filteredGuilds = useMemo(() => {
    const searchLower = search.toLowerCase();
    return guildsWithPermissions.filter((guild: Guild) => {
      const matchesSearch =
        guild.name.toLowerCase().includes(searchLower) ||
        guild.id.includes(search) ||
        guild.features.some((f) => f.toLowerCase().includes(searchLower)) ||
        [
          guild.permissionsObj.general,
          guild.permissionsObj.text,
          guild.permissionsObj.voice,
        ].some((perms) =>
          perms.some((perm: string) => perm.toLowerCase().includes(searchLower))
        );

      const matchesFilters =
        filters.length === 0 ||
        filters.every((filter) => {
          switch (filter) {
            case "owner":
              return guild.owner;
            case "admin":
              return (
                !guild.owner &&
                (parseInt(guild.permissions.toString()) & 0x8) === 0x8
              );
            case "verified":
              return guild.features.includes("VERIFIED");
            case "partnered":
              return guild.features.includes("PARTNERED");
            case "staff":
              return (
                guild.features.includes("INTERNAL_EMPLOYEE_ONLY") ||
                guild.features.includes(
                  "STAFF_LEVEL_RESTRICTED_COLLABORATOR_REQUIRED"
                )
              );
            default:
              return true;
          }
        });

      return matchesSearch && matchesFilters;
    });
  }, [guildsWithPermissions, search, filters]);

  const buttonLabel = filters.length
    ? `Filters (${filters.length})`
    : "Filters";

  return (
    <>
      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Search name, ID, feat, or perm"
          onChange={(e) => debouncedSetSearch(e.target.value)}
          className={styles.filterInput}
        />
        <Button
          variant="contained"
          onClick={handleClick}
          className={styles.filterButton}
          sx={{
            backgroundColor: "#40444b",
            color: "#dcddde",
            "&:hover": {
              backgroundColor: "#5865f2",
              color: "#ffffff",
            },
          }}
        >
          {buttonLabel}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#2f3136",
              color: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              marginTop: "4px",
              "& .MuiMenuItem-root": {
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#40444b",
                },
              },
            },
          }}
        >
          {filterOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              sx={{ padding: "4px 16px" }}
            >
              <Checkbox
                checked={filters.includes(option.value)}
                sx={{
                  color: "#ffffff",
                  "&.Mui-checked": {
                    color: "#5865f2",
                  },
                }}
              />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className={styles.guildList}>
        <AnimatePresence>
          {filteredGuilds.map((guild: Guild) => (
            <motion.div
              key={guild.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <GuildCard guild={guild} permissions={guild.permissionsObj} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
