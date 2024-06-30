/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
"use client";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import React, {
  MouseEvent,
  ReactNode,
  useState,
  Fragment,
  useEffect,
} from "react";
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
  const [language, setLanguage] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("language")
        ? localStorage.getItem("language")
        : "en_EN"
      : ""
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClickM = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorM(anchorM ? null : event.currentTarget);
  };

  const languageSwitcher = (menuItem: string, popupState: any) => {
    return () => {
      setLanguage(menuItem);
      localStorage.setItem("language", menuItem);
      window.dispatchEvent(new Event("storage"));
      return popupState.close();
    };
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
      large: new Translate().get(language!, "Comps.page.languages.english"),
    },
    {
      small: "es_ES",
      large: new Translate().get(language!, "Comps.page.languages.spanish"),
    },
    {
      small: "fr_FR",
      large: new Translate().get(language!, "Comps.page.languages.french"),
    },
    {
      small: "ds_DS",
      large: new Translate().get(language!, "Comps.page.languages.danSucks"),
    },
    {
      small: "ec_EC",
      large: new Translate().get(language!, "Comps.page.languages.enchant"),
    },
  ];

  const array: {
    name: string;
    class: string;
    src: string;
    path: string;
  }[] = [
    {
      name: new Translate().get(language!, "Comps.page.home"),
      class: "home",
      src: "House",
      path: "/",
    },
    {
      name: new Translate().get(language!, "Comps.page.projects"),
      class: "projects",
      src: "Folder",
      path: "/projects",
    },
    {
      name: new Translate().get(language!, "Comps.page.info"),
      class: "info",
      src: "Info",
      path: "/info",
    },
  ];

  useEffect(() => {
    if (Date().includes("Jun 29")) {
      for (let i = 0; i < 130; i++) {
        // Random rotation
        var randomRotation = Math.floor(Math.random() * 360);
        // Random Scale
        var randomScale = Math.random() * 1;
        // Random width & height between 0 and viewport
        var randomWidth = Math.floor(
          Math.random() *
            Math.max(
              document.documentElement.clientWidth,
              window.innerWidth || -10
            )
        );
        var randomHeight = Math.floor(
          Math.random() *
            Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 500
            )
        );

        // Random animation-delay
        var randomAnimationDelay = Math.floor(Math.random() * 13);
        var confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.top = randomHeight + "px";
        confetti.style.right = randomWidth + "px";
        confetti.style.backgroundColor =
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        confetti.style.transform = "scale(" + randomScale + ")";
        confetti.style.transform =
          "skew(15deg) rotate(" + randomRotation + "deg)";
        confetti.style.animationDelay = randomAnimationDelay + "s";
        document.getElementById("confetti-wrapper")!.appendChild(confetti);
      }
    }

    if (Date().includes("Jun") && !Date().includes("Jun 30")) {
      let countDownDate = new Date(
        `Jun 29, ${new Date().getFullYear()} 00:00:00`
      ).getTime();
      let x = setInterval(function () {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let time = `${days.toString().length < 2 ? `0${days}` : days}:${
          hours.toString().length < 2 ? `0${hours}` : hours
        }:${minutes.toString().length < 2 ? `0${minutes}` : minutes}:${
          seconds.toString().length < 2 ? `0${seconds}` : seconds
        }`;
        document.getElementById("bday")!.innerHTML = time;
        if (distance <= 0) {
          clearInterval(x);
          document.getElementById("bday")!.innerHTML = "Today!";
        }
      }, 1000);
    }
  }, []);

  return (
    <TransitionEffect>
      {Date().includes("Jun") && !Date().includes("Jun 30") && (
        <div className="BirthdayDiv">
          <p>Birthday Countdown</p>
          <div style={{ backgroundColor: "#4D2424" }} className="divider"></div>
          <p style={{ fontSize: "15px" }} id="bday"></p>
        </div>
      )}
      <div className="parent center">
        <div className="card boxes" id="confetti-wrapper">
          <div
            className="cardSlider hide center"
            style={{ marginRight: 10, zIndex: 1000 }}
          >
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
                          {new Translate().get(
                            language!,
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
                            language!,
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
                              {new Translate().get(
                                language!,
                                "Comps.page.dark"
                              )}
                            </h3>
                          </div>
                          <div
                            onClick={() => colorTheme("230, 89, 89")}
                            className="colors card boxes"
                          >
                            <h3>
                              {new Translate().get(
                                language!,
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
                                language!,
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
                                language!,
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
              content={new Translate().get(language!, "Comps.page.settings")}
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
                              language!,
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
                              language!,
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
                                  language!,
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
                                  language!,
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
                                  language!,
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
                                  language!,
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
