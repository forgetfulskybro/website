"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function TransitionEffect({
  children,
}: {
  children: React.ReactNode;
}) {
  const variants = {
    in: {
      scale: 0.8,
      y: 100,
      x: "100%",
      transition: {
        duration: 0.4,
      },
    },
    center: {
      x: 0,
      scale: 0.8,
      transition: {
        duration: 0.4,
      },
    },
    scaleUp: {
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.5,
      },
    },
    scaleDown: {
      y: 100,
      transition: {
        duration: 0.4,
        delay: 0.5,
      },
    },
    out: {
      scale: 0.8,
      x: "-100%",
      transition: {
        duration: 0.4,
      },
    },
  };
  return (
    <>
      <AnimatePresence mode="sync">
        <motion.div
          key={usePathname()}
          variants={variants}
          initial={["in"]}
          animate={["center", "scaleUp"]}
          exit={["scaleDown", "out"]}>
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
