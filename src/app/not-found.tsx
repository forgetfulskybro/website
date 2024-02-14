"use client";
import Translate from "@components/translation";
import Page from "@/components/pageSecondary";
import Image from "next/image";
import React, { SetStateAction } from "react";

export default function Home() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    const handleStorageChange = (event: any) => {
      if ((localStorage.getItem("language") as SetStateAction<string>) !== data)
        return setData(
          localStorage.getItem("language") as SetStateAction<string>
        );
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [data]);

  React.useEffect(() => {
    return setData(
      (localStorage.getItem("language") as SetStateAction<string>)
        ? (localStorage.getItem("language") as SetStateAction<string>)
        : "en_EN"
    );
  }, []);
  return (
    <main className="main">
      <Page>
        <div className="center flexGrid">
          <div className="sizing">
            {new Translate().get(data, "Misc.404.forgetful")}{" "}
            <b>ForGetFul</b>{" "}
            <Image
              style={{ marginBottom: -7 }}
              src="/trol.png"
              width={37}
              height={37}
              draggable={false}
              alt="trol"
            />
          </div>
        </div>
      </Page>
    </main>
  );
}
