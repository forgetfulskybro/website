"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { LangSelect } from "@/components/LanguageSelect";
import SocialLinks from "@/components/SocialLinks";
import Translate from "@/components/translation";
import AppShell from "@/components/pageNav/AppShell";
import Image from "next/image";
import React from "react";

export default function HomeClient() {
  const data = LangSelect();
  const translate = new Translate();

  function calcAge(dateString: Date) {
    const startDate = +new Date(dateString);
    return ~~((Date.now() - startDate) / 31557600000);
  }

  function birthday() {
    const d = new Date();
    const isToday = d.getMonth() === 5 && d.getDate() === 29;
    if (isToday) {
      const before = translate.get(data!, "Misc.page.birthday.today.before");
      const after = translate.get(data!, "Misc.page.birthday.today.after");
      const age = calcAge(new Date("2004-06-29 00:00:00")) + 1;
      return (
        <>
          {before}
          <strong className="Blue">{age}</strong>
          {after}
        </>
      );
    }
    const before = translate.get(data!, "Misc.page.birthday.random.before");
    const after = translate.get(data!, "Misc.page.birthday.random.after");
    const age = calcAge(new Date("2004-06-29 00:00:00"));
    return (
      <>
        {before}
        <strong className="Blue">{age}</strong>
        {after}
      </>
    );
  }

  const descBefore = translate.get(data!, "Misc.page.desc.before");
  const descAfter = translate.get(data!, "Misc.page.desc.after");
  const codingYears = calcAge(new Date("2019-07-03"));

  return (
    <main className="main">
      <div className="starryBackground" />
      <div className="shootingStarContainer" ref={useShootingStars()} />

      <AppShell>
        <div style={{ width: 550, marginTop: 25 }}>
          <div className="flexGrid centered">
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "10%",
                transition:
                  "opacity 0.25s ease-in-out, transform 0.25s ease-in-out, border-color 0.25s ease-in-out",
                marginBottom: 10,
              }}
            >
              <Image
                className="hiding"
                src="/Me.png"
                height={140}
                width={140}
                draggable={false}
                alt="Avatar"
                priority
              />
            </span>
          </div>
          <div className="sizing" style={{ paddingBottom: 10 }}>
            {translate.get(data!, "Misc.page.descHello")}{" "}
            <strong className="Blue">ForGetFulSkyBro</strong>{" "}
            {translate.get(data!, "Misc.page.descOr")}{" "}
            <strong className="Blue">Sky</strong>{" "}
            {translate.get(data!, "Misc.page.descShort")}. {birthday()}{" "}
            {descBefore}
            <strong className="Blue">{codingYears}</strong>
            {descAfter}
          </div>
          <div className="flexGrid centered">
            <SocialLinks />
          </div>
        </div>
        <div className="flexGrid centered">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "10%",
              transition:
                "opacity 0.25s ease-in-out, transform 0.25s ease-in-out, border-color 0.25s ease-in-out",
            }}
          >
            <Image
              className="hide highlight"
              src="/Me.png"
              height={240}
              width={240}
              style={{ height: "auto", width: 200 }}
              draggable={false}
              alt="Avatar"
              priority
            />
          </span>
        </div>
      </AppShell>
    </main>
  );
}
