"use client";
import Link from "next/link";
import TransitionEffect from "@/components/TransitionEffect";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UncontrolledTooltip } from "reactstrap";

export default function Page({ children }) {
  return (
    <TransitionEffect key={usePathname()}>
      <div className="parent center">
        <div className="card boxes">
          <div style={{ height: '48px', marginRight: '.7rem' }} className="cardSlider">
            <Link href="/blog" prefetch={true}>
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
                Go back
              </UncontrolledTooltip>
              <span
                id="tooltip"
                style={{ marginTop: 8 }}
                className="dot home homeHigh">
                <Image
                  style={{ marginTop: 7 }}
                  src="../backward.svg"
                  width={17}
                  height={17}
                  draggable={false}
                  alt="Go back"
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
