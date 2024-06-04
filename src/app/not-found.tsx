"use client";
import { LangSelect } from "@/components/LanguageSelect";
import Translate from "@components/translation";
import Page from "@/components/pageSecondary";
import Image from "next/image";
import React from "react";

export default function Home() {
  const data = LangSelect();
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
