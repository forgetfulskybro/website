/* eslint-disable react/no-children-prop */
"use client";
import TransitionEffect from "@/components/TransitionEffect";
import { UncontrolledTooltip } from "reactstrap";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <TransitionEffect>
      <div className="parent center">
        <div className="card boxes flexGrid">
          <div className="cardSlider hide">
            <Link href="/" prefetch={true}>
              <UncontrolledTooltip
                style={{
                  border: "1px solid rgba(var(200, 200, 200), 0.15)",
                  transition: "200ms, border 200ms",
                  margin: "5px 5px 5px 5px",
                  backgroundColor: "#060607",
                  padding: 5,
                  borderRadius: 7,
                  fontSize: 13,
                }}
                target="tooltip"
              >
                Home
              </UncontrolledTooltip>
              <span
                id="tooltip"
                style={{ marginTop: 8 }}
                className={
                  usePathname() === "/" ? "dot home homeHigh" : "dot home"
                }
              >
                <Image
                  style={{ marginTop: 7 }}
                  src={`House.svg`}
                  width={17}
                  height={17}
                  draggable={false}
                  alt="House"
                  priority
                />
              </span>
            </Link>
            <Link href="/projects" prefetch={true}>
              <UncontrolledTooltip
                style={{
                  margin: "5px 5px 5px 5px",
                  backgroundColor: "#060607",
                  padding: 5,
                  borderRadius: 7,
                  fontSize: 13,
                }}
                target="tooltip2"
              >
                Projects
              </UncontrolledTooltip>
              <span
                id="tooltip2"
                className={
                  usePathname() === "/projects"
                    ? "dot projects projectsHigh"
                    : "dot projects"
                }
              >
                <Image
                  style={{ marginTop: 7 }}
                  src="Folder.svg"
                  width={17}
                  height={17}
                  draggable={false}
                  alt="House"
                  priority
                />
              </span>
            </Link>
            <Link href="/blog" prefetch={true}>
              <UncontrolledTooltip
                style={{
                  margin: "5px 5px 5px 5px",
                  backgroundColor: "#060607",
                  padding: 5,
                  borderRadius: 7,
                  fontSize: 13,
                }}
                target="tooltip3"
              >
                Blog
              </UncontrolledTooltip>
              <span
                id="tooltip3"
                className={
                  usePathname() === "/blog" ? "dot blog blogHigh" : "dot blog"
                }
              >
                <Image
                  style={{ marginTop: 7 }}
                  src="Blog.svg"
                  width={17}
                  height={17}
                  draggable={false}
                  alt="House"
                  priority
                />
              </span>
            </Link>
          </div>

          <div className="description">{children}</div>

          <div className="hiding sliderSide boxes">
            <Link href="/" style={{ marginRight: 15 }} prefetch={true}>
              <UncontrolledTooltip
                style={{
                  border: "1px solid rgba(var(200, 200, 200), 0.15)",
                  transition: "200ms, border 200ms",
                  margin: "5px 5px 5px 5px",
                  backgroundColor: "#060607",
                  padding: 5,
                  borderRadius: 7,
                  fontSize: 13,
                }}
                target="tooltip"
              >
                Home
              </UncontrolledTooltip>
              <span
                id="tooltip"
                style={{ marginTop: 4 }}
                className={
                  usePathname() === "/" ? "dot home homeHigh" : "dot home"
                }
              >
                <Image
                  style={{ marginTop: 6 }}
                  src={`House.svg`}
                  width={17}
                  height={17}
                  draggable={false}
                  alt="House"
                  priority
                />
              </span>
            </Link>
            <Link href="/projects" style={{ marginRight: 15 }} prefetch={true}>
              <UncontrolledTooltip
                style={{
                  margin: "5px 5px 5px 5px",
                  backgroundColor: "#060607",
                  padding: 5,
                  borderRadius: 7,
                  fontSize: 13,
                }}
                target="tooltip2"
              >
                Projects
              </UncontrolledTooltip>
              <span
                id="tooltip2"
                className={
                  usePathname() === "/projects"
                    ? "dot projects projectsHigh"
                    : "dot projects"
                }
              >
                <Image
                  style={{ marginTop: 6 }}
                  src="Folder.svg"
                  width={17}
                  height={17}
                  draggable={false}
                  alt="House"
                  priority
                />
              </span>
            </Link>
            <Link href="/blog" prefetch={true}>
              <UncontrolledTooltip
                style={{
                  margin: "5px 5px 5px 5px",
                  backgroundColor: "#060607",
                  padding: 5,
                  borderRadius: 7,
                  fontSize: 13,
                }}
                target="tooltip3"
              >
                Blog
              </UncontrolledTooltip>
              <span
                id="tooltip3"
                className={
                  usePathname() === "/blog" ? "dot blog blogHigh" : "dot blog"
                }
              >
                <Image
                  style={{ marginTop: 6 }}
                  src="Blog.svg"
                  width={17}
                  height={17}
                  draggable={false}
                  alt="House"
                  priority
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </TransitionEffect>
  );
}
