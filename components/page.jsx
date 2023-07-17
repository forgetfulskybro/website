"use client";
import Link from 'next/link';
import TransitionEffect from "@/components/TransitionEffect";
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { UncontrolledTooltip } from "reactstrap";

export default function Page({ children }) {
  return (
    <TransitionEffect key={usePathname()}>
      <div className="parent center">
        <div className="card boxes">
          <div className="cardSlider">
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
                target="tooltip">
                Home
              </UncontrolledTooltip>
              <span
                id="tooltip"
                style={{ marginTop: 8 }}
                className={
                  usePathname() === "/" ? "dot home homeHigh" : "dot home"
                }>
                <Image
                  style={{ marginTop: 7 }}
                  src="House.svg"
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
                target="tooltip2">
                Projects
              </UncontrolledTooltip>
              <span
                id="tooltip2"
                className={
                  usePathname() === "/projects"
                    ? "dot projects projectsHigh"
                    : "dot projects"
                }>
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
            <Link href="/interests" prefetch={true}>
              <UncontrolledTooltip
                style={{
                  margin: "5px 5px 5px 5px",
                  backgroundColor: "#060607",
                  padding: 5,
                  borderRadius: 7,
                  fontSize: 13,
                }}
                target="tooltip3">
                Interests
              </UncontrolledTooltip>
              <span
                id="tooltip3"
                className={
                  usePathname() === "/interests"
                    ? "dot interests interestsHigh"
                    : "dot interests"
                }>
                <Image
                  style={{ marginTop: 7 }}
                  src="Interests.svg"
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
        </div>
      </div>
    </TransitionEffect>
  );
}