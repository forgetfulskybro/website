"use client";
import { useShootingStars } from "@/components/ShootingStars";
import { LangSelect } from "@/components/LanguageSelect";
import AppShell from "@/components/pageNav/AppShell";
import SocialLinks from "@/components/SocialLinks";
import Translate from "@/components/translation";
import Tooltip from "@/components/ToolTip";
import Image from "next/image";

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
          <Tooltip content="June 29th, 2004" placement="top">
            <strong style={{ textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#BA8D2B" }} className="Blue">{age}</strong>
          </Tooltip>
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
        <Tooltip content="June 29th, 2004" placement="top">
          <strong style={{ textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#BA8D2B" }} className="Blue">{age}</strong>
        </Tooltip>
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
                src="/DSG Head.png"
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
            <Tooltip content="or ForGetFul" placement="top">
              <strong style={{ textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#BA8D2B" }} className="Blue">ForGetFulSkyBro</strong>
            </Tooltip>
            {" "}{translate.get(data!, "Misc.page.descOr")}{" "}
            <strong className="Blue">Sky</strong>{" "}
            {translate.get(data!, "Misc.page.descShort")}. {birthday()}{" "}
            {descBefore}
            <Tooltip content="August 3rd, 2019" placement="top">
              <strong style={{ textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#BA8D2B" }} className="Blue">{codingYears}</strong>
            </Tooltip>
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
              src="/DSG Head.png"
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
