/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
"use client";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import React, { MouseEvent, ReactNode, useState, Fragment } from "react";
import TransitionEffect from "@/components/TransitionEffect";
import { Menu, MenuItem, Popover } from "@mui/material";
import { usePathname } from "next/navigation";
import Translate from "./translation";
import ToolTip from "./ToolTip";
import Image from "next/image";
import Link from "next/link";

export default function Page({ children }: { children: ReactNode }) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [anchorM, setAnchorM] = useState<HTMLButtonElement | null>(null);
  const [language, setLanguage] = useState("");

  if (typeof window !== "undefined") {
    window.onload = function () {
      setLanguage(
        (localStorage.getItem("language") as string)
          ? (localStorage.getItem("language") as string)
          : "en_EN"
      );
    };
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClickM = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorM(anchorM ? null : event.currentTarget);
  };

  const languageSwitcher = (menuItem: string, popupState: any) => {
    if (typeof window !== "undefined") {
      setLanguage(menuItem);
      localStorage.setItem("language", menuItem);
      window.dispatchEvent(new Event("storage"));
      return popupState.close();
    }
  };

  const colorTheme = (theme: string) => {
    const rootTheme = document.querySelector<HTMLElement>(":root");
    const root = getComputedStyle(rootTheme as Element);

    if (root?.getPropertyValue("--card-rgb") === theme) return;

    localStorage.setItem("theme", theme);
    return rootTheme?.style.setProperty("--card-rgb", theme);
  };

  const menuArray: {
    small: string;
    large: string;
  }[] = [
    {
      small: "en_EN",
      large: new Translate().get(language, "Comps.page.languages.english"),
    },
    {
      small: "es_ES",
      large: new Translate().get(language, "Comps.page.languages.spanish"),
    },
    {
      small: "fr_FR",
      large: new Translate().get(language, "Comps.page.languages.french"),
    },
    {
      small: "ds_DS",
      large: new Translate().get(language, "Comps.page.languages.danSucks"),
    },
    {
      small: "ec_EC",
      large: new Translate().get(language, "Comps.page.languages.enchant"),
    },
  ];

  const array: {
    name: string;
    class: string;
    src: string;
    path: string;
  }[] = [
    {
      name: new Translate().get(language, "Comps.page.home"),
      class: "home",
      src: "House",
      path: "/",
    },
    {
      name: new Translate().get(language, "Comps.page.projects"),
      class: "projects",
      src: "Folder",
      path: "/projects",
    },
    {
      name: new Translate().get(language, "Comps.page.blog"),
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
              style={{ marginTop: "-5px", marginLeft: "15px" }}
              id={"settings"}
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={handleClick}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <div className="settingsCard">
                <PopupState variant="popover" popupId="popup-menu">
                  {(popupState) => (
                    <div>
                      <Fragment>
                        <button
                          style={{ marginTop: "9px" }}
                          {...bindTrigger(popupState)}
                          className="button"
                        >
                          {new Translate().get(language, "Comps.page.language")}{" "}
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
                              onClick={languageSwitcher(m.small, popupState)}
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
                      </Fragment>

                      <div
                        style={{
                          marginTop: "37px",
                          fontSize: "12px",
                        }}
                      >
                        <h3>
                          {new Translate().get(
                            language,
                            "Comps.page.colorTheme"
                          )}
                        </h3>
                        <div
                          style={{ marginTop: "10px" }}
                          className="flexGrid center"
                        >
                          <div
                            onClick={() => colorTheme("100, 100, 100")}
                            style={{ backgroundColor: "#131314" }}
                            className="colors card boxes"
                          >
                            <h3>
                              {new Translate().get(language, "Comps.page.dark")}
                            </h3>
                          </div>
                          <div
                            onClick={() => colorTheme("230, 89, 89")}
                            className="colors card boxes"
                          >
                            <h3>
                              {new Translate().get(
                                language,
                                "Comps.page.shrimp"
                              )}
                            </h3>
                          </div>
                          <div
                            onClick={() => colorTheme("63, 41, 90")}
                            style={{
                              backgroundColor: "#3F295A",
                            }}
                            className="colors card boxes"
                          >
                            <h3>
                              {new Translate().get(
                                language,
                                "Comps.page.chant"
                              )}
                            </h3>
                          </div>
                          <div
                            onClick={() => colorTheme("98, 195, 237")}
                            style={{
                              backgroundColor: "#62C3ED",
                            }}
                            className="colors card boxes"
                          >
                            <h3>
                              {new Translate().get(
                                language,
                                "Comps.page.smurf"
                              )}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </PopupState>
              </div>
            </Popover>
            <ToolTip
              content={new Translate().get(language, "Comps.page.settings")}
              placement="top"
            >
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
            <div style={{ marginBottom: 4, marginTop: -0 }} className="divider">
              hi
            </div>
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
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <div className="settingsCardM">
                  <PopupState variant="popover" popupId="popup-menuM">
                    {(popupState) => (
                      <div>
                        <Fragment>
                          <button
                            style={{ marginTop: "9px" }}
                            {...bindTrigger(popupState)}
                            className="button"
                          >
                            {new Translate().get(
                              language,
                              "Comps.page.language"
                            )}{" "}
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
                                onClick={languageSwitcher(m.small, popupState)}
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
                        </Fragment>

                        <div
                          style={{
                            marginTop: "37px",
                            fontSize: "12px",
                          }}
                        >
                          <h3>
                            {new Translate().get(
                              language,
                              "Comps.page.colorTheme"
                            )}
                          </h3>
                          <div
                            style={{ marginTop: "10px" }}
                            className="flexGrid center"
                          >
                            <div
                              onClick={() => colorTheme("100, 100, 100")}
                              style={{ backgroundColor: "#131314" }}
                              className="colorsM card boxes"
                            >
                              <h3>
                                {new Translate().get(
                                  language,
                                  "Comps.page.dark"
                                )}
                              </h3>
                            </div>
                            <div
                              onClick={() => colorTheme("230, 89, 89")}
                              className="colorsM card boxes"
                            >
                              <h3>
                                {new Translate().get(
                                  language,
                                  "Comps.page.shrimp"
                                )}
                              </h3>
                            </div>
                            <div
                              onClick={() => colorTheme("63, 41, 90")}
                              style={{
                                backgroundColor: "#3F295A",
                              }}
                              className="colorsM card boxes"
                            >
                              <h3>
                                {new Translate().get(
                                  language,
                                  "Comps.page.chant"
                                )}
                              </h3>
                            </div>
                            <div
                              onClick={() => colorTheme("98, 195, 237")}
                              style={{
                                backgroundColor: "#62C3ED",
                              }}
                              className="colorsM card boxes"
                            >
                              <h3>
                                {new Translate().get(
                                  language,
                                  "Comps.page.smurf"
                                )}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </PopupState>
                </div>
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
