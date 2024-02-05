/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
"use client";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import TransitionEffect from "@/components/TransitionEffect";
import { usePathname } from "next/navigation";
import { Menu, MenuItem, Popover } from "@mui/material";
import { useTheme } from "@mui/system";
import ToolTip from "./ToolTip";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [anchorM, setAnchorM] = React.useState<HTMLButtonElement | null>(null);
  const [language, setLanguage] = React.useState("en");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClickM = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorM(anchorM ? null : event.currentTarget);
  };

  const createHandleMenuClick = (menuItem: string, popupState: any) => {
    return () => {
      setLanguage(menuItem);
      return popupState.close();
    };
  };

  const menuArray: {
    small: string;
    large: string;
  }[] = [
    {
      small: "en",
      large: "English",
    },
    {
      small: "sp",
      large: "Spanish (Test)",
    },
    {
      small: "fr",
      large: "French (Test)",
    },
    {
      small: "ds",
      large: "Dan Sucks",
    },
  ];

  const array: {
    name: string;
    class: string;
    src: string;
    path: string;
  }[] = [
    {
      name: "Home",
      class: "home",
      src: "House",
      path: "/",
    },
    {
      name: "Projects",
      class: "projects",
      src: "Folder",
      path: "/projects",
    },
    {
      name: "Blog",
      class: "blog",
      src: "Blog",
      path: "/blog",
    },
  ];

  return (
    <TransitionEffect>
      <div className="parent center">
        <div className="card boxes">
          <div className="cardSlider hide center" style={{ marginRight: 10 }}>
            <Popover
              style={{ marginLeft: "20px" }}
              id={"settings"}
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={handleClick}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <div
                style={{ backgroundColor: "#111112", color: "#fff" }}
                className="settingsCard"
              >
                <PopupState variant="popover" popupId="popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <button
                        style={{ marginTop: "50px" }}
                        {...bindTrigger(popupState)}
                        className="button"
                      >
                        Language{" "}
                        <Image
                          src={`arrow.svg`}
                          width={10}
                          height={10}
                          draggable={false}
                          alt={"Dropdown"}
                          priority
                        />
                      </button>
                      <Menu {...bindMenu(popupState)}>
                        {menuArray.map((m) => (
                          <MenuItem
                            key={m.small}
                            onClick={createHandleMenuClick(m.small, popupState)}
                          >
                            {language === m.small ? (
                              <Image
                                style={{ marginRight: "5px" }}
                                src={`check.svg`}
                                width={15}
                                height={15}
                                draggable={false}
                                alt={"Selected"}
                                priority
                              />
                            ) : (
                              ""
                            )}
                            {m.large}
                          </MenuItem>
                        ))}
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </div>
            </Popover>
            <ToolTip content="Settings" placement="top">
              <span
                aria-describedby="settings"
                onClick={handleClick}
                style={{ marginTop: 4.5 }}
                className={
                  Boolean(anchor) ? "dot settings settingsHigh" : "dot settings"
                }
              >
                <Image
                  style={{ marginTop: 7 }}
                  src={`Gear.svg`}
                  width={17}
                  height={17}
                  draggable={false}
                  alt={"Gear settings"}
                  priority
                />
              </span>
            </ToolTip>
            <div
              style={{ marginBottom: 4, marginTop: -0 }}
              className="divider"
            ></div>
            {array.map((d, i) => (
              <Link href={d.path} key={d.src}>
                <ToolTip content={d.name} placement="top">
                  <span
                    style={{ marginTop: 4.5 }}
                    className={
                      usePathname() === d.path
                        ? `dot ${d.class} ${d.class}High`
                        : `dot ${d.class}`
                    }
                  >
                    <Image
                      style={{ marginLeft: -1, marginTop: 6 }}
                      src={`${d.src}.svg`}
                      width={17}
                      height={17}
                      draggable={false}
                      alt={d.src}
                    />
                  </span>
                </ToolTip>
              </Link>
            ))}
          </div>

          <div className="hiding flexGrid center">
            <div className="description">{children}</div>
            <div className="hiding sliderSide boxes" style={{ marginTop: 3 }}>
              <Popover
                style={{ marginLeft: "61px" }}
                id={"settingsM"}
                open={Boolean(anchorM)}
                anchorEl={anchorM}
                onClose={handleClickM}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <div
                  style={{ backgroundColor: "#111112", color: "#fff" }}
                  className="settingsCard flex"
                ></div>
              </Popover>
              <ToolTip content="Settings" placement="top">
                <span
                  onClick={handleClickM}
                  aria-describedby="settingsM"
                  style={{ marginLeft: 3.5, marginTop: 4 }}
                  className={
                    Boolean(anchorM)
                      ? "dot settings settingsHigh"
                      : "dot settings"
                  }
                >
                  <Image
                    style={{ marginTop: 6 }}
                    src={`Gear.svg`}
                    width={17}
                    height={17}
                    draggable={false}
                    alt={"Settings"}
                    priority
                  />
                </span>
              </ToolTip>
              <div
                style={{
                  display: "inline-block",
                  marginBottom: "-3px",
                  height: "95%",
                }}
                className="dividerUp"
              ></div>
              {array.map((d, i) => (
                <Link
                  key={d.src}
                  href={d.path}
                  style={{ marginLeft: 5.5, marginRight: 6 }}
                >
                  <ToolTip content={d.name} placement="top">
                    <span
                      id={`tooltip${i}M`}
                      style={{ marginTop: 4 }}
                      className={
                        usePathname() === d.path
                          ? `dot home ${d.class}High`
                          : "dot home"
                      }
                    >
                      <Image
                        style={{ marginTop: 6 }}
                        src={`${d.src}.svg`}
                        width={17}
                        height={17}
                        draggable={false}
                        alt={d.src}
                        priority
                      />
                    </span>
                  </ToolTip>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TransitionEffect>
  );
}
