"use client";
import Translate from "@components/translation";
import Page from "@/components/pageSecondary";
import Image from "next/image";
import React, { SetStateAction } from "react";

export default function Home() {
  const [data, setData] = React.useState<string | null>("");
  const ISSERVER = typeof window === "undefined";

  React.useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (localStorage.getItem("language") !== data)
        return setData(localStorage.getItem("language"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [data]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      return setData(
        localStorage.getItem("language")
          ? localStorage.getItem("language")
          : "en_EN"
      );
    }
  }, []);
  return (
    <main className="main">
      <Page>
        <div className="center flexGrid">
          <div className="sizing">
            {new Translate().get(data!, "Misc.404.forgetful")} <b>ForGetFul</b>{" "}
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
