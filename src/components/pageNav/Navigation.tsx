import { NavItem } from "../types";
import ToolTip from "../ToolTip";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NavigationProps {
  items: NavItem[];
  pathname: string;
}

export default function Navigation({ items, pathname }: NavigationProps) {
  return (
    <>
      {items.map((item, index) => (
        <div
          key={item.src}
          style={{ marginBottom: index < items.length - 1 ? "12px" : "0" }}
        >
          <Link href={item.path}>
            <ToolTip content={item.name} placement="top">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "35%",
                  height: "30px",
                  width: "30px",
                  transition: "all 0.25s ease-in-out",
                }}
                className={`dot ${item.class} ${
                  pathname === item.path ? `${item.class}High` : ""
                }`}
                onMouseEnter={(e) => {
                  if (pathname !== item.path) {
                    e.currentTarget.className = `dot ${item.class} ${item.class}High`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.path) {
                    e.currentTarget.className = `dot ${item.class}`;
                  }
                }}
              >
                <Image
                  style={{ opacity: 0.8, marginRight: "0.02px", marginBottom: "0.3px" }}
                  src={`${item.src}.svg`}
                  width={17}
                  height={17}
                  draggable={false}
                  alt={item.src}
                />
              </span>
            </ToolTip>
          </Link>
        </div>
      ))}
    </>
  );
}
